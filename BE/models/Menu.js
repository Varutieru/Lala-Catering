const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    gambar: {
        type: String
    },
    kategori: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    stok: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuItemSchema);
module.exports = Menu;