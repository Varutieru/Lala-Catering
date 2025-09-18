<<<<<<< Updated upstream
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
=======
const Menu = require("../models/Menu");

// ambil semua menu
const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menus", error });
    }
};

// tambah menu baru
const createMenu = async (req, res) => {
    try {
        const { name, description, price, schedule, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        if (schedule && !schedule.every(day => validDays.includes(day.toLowerCase()))) {
            return res.status(400).json({ message: "Invalid schedule days" });
        }

        const newMenu = new Menu({ name, description: description || " ", price, schedule: schedule || [], stock });
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ message: "Error creating menu", error });
    }
};

//ambil menu bedasarkan hari
const getMenusByDay = async (req, res) => {
    try {
        const day = req.params.day.toLowerCase();
        const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        if (!validDays.includes(day)) {
            return res.status(400).json({ message: "Invalid day" });
        }
        const menus = await Menu.find({ schedule: day });
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menus", error });
    }
};

// ambil menu lalu dikelompokkan bedasarkan hari
const getMenusGroupedbyDay = async (req, res) => {
    try {
        const menus = await Menu.find();
        const groupedMenus = {};
        menus.forEach(menu => {
            menu.schedule.forEach(day => {
                if (!groupedMenus[day]) {
                    groupedMenus[day] = [];
                }
                groupedMenus[day].push(menu);
            });
        }
        );
        res.status(200).json(groupedMenus);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menus", error });
    }
};

// update menu
const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, schedule, stock } = req.body;

        const menu = await Menu.findByIdAndUpdate(id, { name, description, price, schedule, stock }, { new: true });
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error updating menu", error });
    }
};

// delete menu
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findByIdAndDelete(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(204).send( );
    } catch (error) {
        res.status(500).json({ message: "Error deleting menu", error });
    }
};

module.exports = {
    getMenus,
    createMenu,
    getMenusByDay,
    getMenusGroupedbyDay,
    updateMenu,
    deleteMenu
};
>>>>>>> Stashed changes
