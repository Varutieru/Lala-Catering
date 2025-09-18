const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem',
            required: true
        },
        namaItem: {
            type: String,
            required: true
        },
        harga: {
            type: Number,
            required: true
        },
        jumlah: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalHarga: {
        type: Number,
        required: true
    },
    lokasiPengiriman: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    tanggalPesanan: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'diproses', 'dikirim', 'selesai', 'dibatalkan'],
        default: 'pending'
    },
    midtransTransactionId: {
        type: String
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
