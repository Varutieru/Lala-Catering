const mongoose = require('mongoose');

<<<<<<< Updated upstream
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
=======
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    schedule: [{
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    stock: { type: Number, default: 10, min: 0 }
},{timestamps: true});

module.exports = mongoose.model("Menu", menuSchema);
>>>>>>> Stashed changes
