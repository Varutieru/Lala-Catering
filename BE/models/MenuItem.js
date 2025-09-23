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
<<<<<<< HEAD
=======
    kategori: {
        type: String,
        enum: ['makanan', 'minuman', 'cemilan'],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
>>>>>>> e5ee02d2db43f59ca5ccbe80ff50e0fadfde52be
    stok: {
        type: Number,
        default: 0
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
