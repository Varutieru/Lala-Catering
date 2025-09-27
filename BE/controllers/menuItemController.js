const MenuItem = require('../models/MenuItem');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ isAvailable: true });
        res.json(menuItems);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const createMenuItem = async (req, res) => {
    try {
        const { nama, deskripsi, harga, kategori, stok } = req.body;
        let gambar = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            gambar = result.secure_url;
        }
        const newItem = new MenuItem({ nama, deskripsi, harga, kategori, gambar, stok });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
    }
};

module.exports = { getMenuItems, createMenuItem, upload };
