const JadwalHarian = require('../models/JadwalHarian');

const setWeeklySchedule = async (req, res) => {
    try {
        const weeklySchedule = req.body;
        const operations = weeklySchedule.map(schedule => {
            return {
                updateOne: {
                    filter: { tanggal: schedule.tanggal },
                    update: { $set: schedule },
                    upsert: true
                }
            };
        });
        await JadwalHarian.bulkWrite(operations);
        res.status(200).json({ message: 'Jadwal mingguan berhasil diperbarui.' });
    } catch (error) {
        // Perbaikan: Tambahkan penanganan error yang lebih spesifik
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui jadwal.' });
    }
};

const getWeeklySchedule = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextSevenDays = new Date(today);
        nextSevenDays.setDate(today.getDate() + 7);

        const weeklySchedule = await JadwalHarian.find({
            tanggal: { $gte: today, $lt: nextSevenDays }
        })
        .populate('menuTersedia', 'nama harga deskripsi');

        res.status(200).json(weeklySchedule);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// Fungsi baru: Untuk mengambil jadwal menu harian
const getDailyMenu = async (req, res) => {
    try {
        const tanggal = req.query.tanggal ? new Date(req.query.tanggal) : new Date();
        tanggal.setHours(0, 0, 0, 0);

        const jadwalHariIni = await JadwalHarian.findOne({ tanggal }).populate('menuTersedia');

        if (!jadwalHariIni || jadwalHariIni.statusToko === 'tutup') {
            return res.status(200).json([]); // Kembalikan array kosong jika tidak ada jadwal atau toko tutup
        }

        res.status(200).json(jadwalHariIni.menuTersedia);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports = { setWeeklySchedule, getWeeklySchedule, getDailyMenu };