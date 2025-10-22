const MenuItem = require('../models/MenuItem');

const setMenuSchedule = async (req, res) => {
    try {
        const { menuId, jadwal } = req.body;

        if (!menuId || !Array.isArray(jadwal)) {
            return res.status(400).json({ message: 'menuId dan jadwal array wajib diisi' });
        }

        const updatedMenu = await MenuItem.findByIdAndUpdate(
            menuId,
            { jadwal },
            { new: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu tidak ditemukan' });
        }

        res.status(200).json({ message: 'Jadwal berhasil diperbarui', data: updatedMenu });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScheduleByDay = async (req, res) => {
    try {
        const menus = await MenuItem.find({}, '_id jadwal'); 

        const hariList = ['senin','selasa','rabu','kamis','jumat','sabtu','minggu'];
        const result = hariList.map(hari => ({
            hari,
            menuTersedia: menus
                .filter(menu => menu.jadwal.includes(hari))
                .map(menu => menu._id.toString())
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodayMenu = async (req, res) => {
    try {
        // dapatkan nama hari dalam format lowercase
        const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();

        // cari menu yang memiliki jadwal hari ini
        const menuHariIni = await MenuItem.find({ jadwal: hariIni });

        if (menuHariIni.length === 0) {
            return res.status(404).json({ message: `Menu untuk hari ${hariIni} tidak ditemukan.` });
        }

        res.status(200).json(menuHariIni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuByDay = async (req, res) => {
    try {
        const hari = req.params.hari.toLowerCase(); // misal 'senin'

        // Ambil semua menu yang jadwal-nya mengandung hari ini
        const menus = await MenuItem.find({ jadwal: hari });

        if (!menus.length) {
            return res.status(404).json({ message: `Jadwal untuk hari ${hari} tidak ditemukan.` });
        }

        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { setMenuSchedule, getScheduleByDay, getTodayMenu, getMenuByDay };