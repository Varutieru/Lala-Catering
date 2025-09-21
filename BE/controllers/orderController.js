const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const midtransClient = require('midtrans-client');
const pdf = require('html-pdf');

const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

const createOrder = async (req, res) => {
    try {
        const { items, lokasiPengiriman } = req.body;
        let totalHarga = 0;
        const orderedItems = [];

        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItemId);
            if (!menuItem || menuItem.stok < item.jumlah) {
                return res.status(404).json({ message: `Item menu '${item.menuItemId}' tidak tersedia.` });
            }
            totalHarga += menuItem.harga * item.jumlah;
            orderedItems.push({
                menuItemId: menuItem._id,
                namaItem: menuItem.nama,
                harga: menuItem.harga,
                jumlah: item.jumlah
            });
        }

        const newOrder = new Order({
            userId: req.user.id,
            items: orderedItems,
            totalHarga,
            lokasiPengiriman,
            alamatPengirimanText
        });
        await newOrder.save();

        const user = await User.findById(req.user.id);
        if (user && user.email) {
            sendEmail(user.email, 'Konfirmasi Pesanan', `Halo ${user.nama}, pesanan Anda dengan ID ${newOrder._id} telah diterima dan sedang diproses.`);
        }

        res.status(201).json(newOrder);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'nama nomorTelepon alamatPengiriman').populate('items.menuItemId', 'nama harga');
        res.json(orders);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { newStatus } = req.body;
        const order = await Order.findById(req.params.id).populate('userId', 'nama nomorTelepon');

        if (!order) return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });

        const validStatuses = ['pending', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ message: 'Status tidak valid.' });
        }

        order.status = newStatus;
        await order.save();

        const user = order.userId;
        if (user && user.email) {
            let message = '';
            if (newStatus === 'diproses') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) sedang diproses.`;
            } else if (newStatus === 'dikirim') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) sedang dalam pengiriman.`;
            } else if (newStatus === 'selesai') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) telah selesai. Terima kasih!`;
            } else if (newStatus === 'dibatalkan') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) telah dibatalkan. Mohon maaf atas ketidaknyamanan ini.`;
            }

            if (message) {
                sendEmail(user.email, 'Update Status Pesanan', message);
            }
        }

        res.json({ message: `Status pesanan diubah menjadi ${newStatus}.`, order });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const checkout = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('userId', 'nama email');

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }
        
        const midtransOrderId = `ORDER-${order._id}-${Date.now()}`;
        const parameter = {
            transaction_details: {
                order_id: midtransOrderId,
                gross_amount: order.totalHarga,
            },
            customer_details: {
                first_name: order.userId.nama,
                email: order.userId.email,
            },
            credit_card: {
                secure: true
            }
        };

        const transaction = await snap.createTransaction(parameter);
        
        order.midtransTransactionId = midtransOrderId;
        await order.save();
        
        res.json({ token: transaction.token });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const handleMidtransCallback = async (req, res) => {
    const { transaction_status, order_id } = req.body;
    const order = await Order.findOne({ midtransTransactionId: order_id });
    if (!order) return res.status(404).send('Not Found');

    if (transaction_status === 'settlement') {
        order.status = 'selesai';
        await order.save();
    } else if (transaction_status === 'expire' || transaction_status === 'cancel' || transaction_status === 'deny') {
        order.status = 'dibatalkan'; 
        await order.save();
    }
    res.status(200).send('OK');
};

const generateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('userId', 'nama email alamatPengiriman').populate('items.menuItemId', 'nama harga');

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }

        const invoiceHtml = `
            <h1>Invoice Pesanan</h1>
            <p>Nomor Pesanan: ${order._id}</p>
            <p>Nama Pelanggan: ${order.userId.nama}</p>
            <p>Alamat Pengiriman: ${order.userId.alamatPengiriman}</p>
            <p>Tanggal Pesanan: ${new Date(order.tanggalPesanan).toLocaleDateString()}</p>
            <h2>Rincian Pesanan:</h2>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Nama Item</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                </tr>
                ${order.items.map(item => `
                    <tr>
                        <td>${item.namaItem}</td>
                        <td>${item.harga}</td>
                        <td>${item.jumlah}</td>
                        <td>${item.harga * item.jumlah}</td>
                    </tr>
                `).join('')}
            </table>
        `;

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in'
            }
        };

        pdf.create(invoiceHtml, options).toBuffer((err, buffer) => {
            if (err) return res.status(500).json({ message: err.message });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=invoice_${order._id}.pdf`);
            res.send(buffer);
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { createOrder, getOrders, updateOrderStatus, checkout, handleMidtransCallback, generateInvoice };