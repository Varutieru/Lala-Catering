const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userInfo:{
        nama: {type :String},
        nomorTelepon: {type :String},
        email: {type :String}
    },
    items: [orderItemSchema],
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
    alamatPengirimanText: String,
    tanggalPesanan: {
        type: Date,
        default: Date.now
    },
    metodePengambilan: {
        type: String,
        enum: ['delivery', 'pickup'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled', 'paid', 'completed'],
        default: 'pending'
    },
    midtransTransactionId: {
        type: String
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
