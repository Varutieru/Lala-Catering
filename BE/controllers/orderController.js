const Order = require('../models/Order');
const MenuItem = require('../models/Menu');
const User = require('../models/User');
const { sendWhatsAppMessage } = require('../services/whatsappService');
const midtransClient = require('midtrans-client');

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
            if (!menuItem || !menuItem.isAvailable) {
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
        });
        await newOrder.save();

        const user = await User.findById(req.user.id);
        if (user && user.nomorTelepon) {
            sendWhatsAppMessage(user.nomorTelepon, `Halo, pesanan Anda (${newOrder._id}) berhasil dibuat. Kami akan segera memprosesnya.`);
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
        if (user && user.nomorTelepon) {
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
                sendWhatsAppMessage(user.nomorTelepon, message);
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

module.exports = { createOrder, getOrders, updateOrderStatus, checkout, handleMidtransCallback };