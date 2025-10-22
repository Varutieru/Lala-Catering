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
    imageUrl: {
        type: String
    },
    stok: {
        type: Number,
        default: 0
    },
    jadwal:{
        type: [String],
        enum: ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'],
        default: []
    },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
