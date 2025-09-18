const MenuItem = require('../models/Menu');
const JadwalHarian = require('../models/JadwalHarian');

const getDailyMenu = async (req, res) => {
    try {
        const tanggal = req.query.tanggal ? new Date(req.query.tanggal) : new Date();
        tanggal.setHours(0, 0, 0, 0);

        const jadwal = await JadwalHarian.findOne({ tanggal }).populate('menuTersedia');

        if (!jadwal) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan.' });
        }

        res.status(200).json(jadwal.menuTersedia);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

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
        const newItem = new MenuItem({ nama, deskripsi, harga, kategori, stok });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
    }
};

module.exports = { getMenuItems, createMenuItem, getDailyMenu };
