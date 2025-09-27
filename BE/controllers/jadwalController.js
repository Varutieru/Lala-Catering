const JadwalHarian = require('../models/JadwalHarian');
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


const getWeeklySchedule = async (req, res) => {
    try {
        const weeklySchedule = await JadwalHarian.find()
            .populate('menuTersedia', 'nama harga deskripsi');

        res.status(200).json(weeklySchedule);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
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

module.exports = { setMenuSchedule, getWeeklySchedule, getScheduleByDay };