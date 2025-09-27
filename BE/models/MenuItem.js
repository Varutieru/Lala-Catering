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
    stok: {
        type: Number,
        default: 0
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
