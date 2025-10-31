const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const midtransClient = require('midtrans-client');
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

const createOrder = async (req, res) => {
    try {
        const { items, lokasiPengiriman, alamatPengirimanText } = req.body;
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

        const validStatuses = ['pending', 'confirmed', 'canceled', 'paid', 'completed'];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ message: 'Status tidak valid.' });
        }

        order.status = newStatus;
        await order.save();

        const user = order.userId;
        if (user && user.email) {
            let message = '';
            if (newStatus === 'confirmed') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) telah dikonfirmasi.`;
            } else if (newStatus === 'paid') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) telah dibayar.`;
            } else if (newStatus === 'completed') {
                message = `Halo ${user.nama}, pesanan Anda (${order._id}) telah selesai. Terima kasih!`;
            } else if (newStatus === 'canceled') {
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
        const order = await Order.findById(id)
            .populate('userId', 'nama email alamatPengiriman')
            .populate('items.menuItemId', 'nama harga');

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }

        if (req.user.role !== 'penjual' && order.userId._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Akses ditolak.' });
        }

        // --- START PDF ---
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        let y = 800; // starting point

        const draw = (text, x, size = 12) => {
            page.drawText(text, { x, y, size, font });
            y -= size + 6;
        };

        // Header
        draw("INVOICE PESANAN", 50, 20);
        y -= 10;

        draw(`Nomor Pesanan: ${order._id}`, 50);
        draw(`Nama Pelanggan: ${order.userId.nama}`, 50);
        draw(`Alamat Pengiriman: ${order.userId.alamatPengiriman}`, 50);
        draw(`Tanggal Pesanan: ${new Date(order.tanggalPesanan).toLocaleDateString()}`, 50);

        y -= 20;
        draw("Rincian Pesanan:", 50, 16);
        y -= 10;

        // Table header
        page.drawText("Item", { x: 50, y, size: 12, font });
        page.drawText("Harga", { x: 250, y, size: 12, font });
        page.drawText("Jumlah", { x: 350, y, size: 12, font });
        page.drawText("Total", { x: 450, y, size: 12, font });
        y -= 20;

        let grandTotal = 0;

        // Table rows
        order.items.forEach(item => {
            const namaItem = item.namaItem || item.menuItemId?.nama;
            const harga = item.harga || item.menuItemId?.harga;
            const jumlah = item.jumlah;

            const total = harga * jumlah;
            grandTotal += total;

            page.drawText(`${namaItem}`, { x: 50, y, size: 12, font });
            page.drawText(`Rp ${harga}`, { x: 250, y, size: 12, font });
            page.drawText(`${jumlah}`, { x: 350, y, size: 12, font });
            page.drawText(`Rp ${total}`, { x: 450, y, size: 12, font });

            y -= 20;
        });

        y -= 20;
        draw(`TOTAL AKHIR: Rp ${grandTotal}`, 50, 14);

        const pdfBytes = await pdfDoc.save();
        // --- END PDF ---

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=invoice_${order._id}.pdf`);
        res.send(Buffer.from(pdfBytes));

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.menuItemId', 'nama harga');
        res.json(orders);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { createOrder, getOrders, updateOrderStatus, checkout, handleMidtransCallback, generateInvoice, myOrders };
