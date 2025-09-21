const JadwalHarian = require('../models/JadwalHarian');

const setWeeklySchedule = async (req, res) => {
    try {
        const weeklySchedule = req.body;
        const operations = weeklySchedule.map(schedule => {
            return {
                updateOne: {
                    filter: { hari: schedule.hari },
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
        const weeklySchedule = await JadwalHarian.find()
        .populate('menuTersedia', 'nama harga deskripsi');

        res.status(200).json(weeklySchedule);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

const validDays = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];

// Fungsi baru: Untuk mengambil jadwal menu harian
const getDailyMenu = async (req, res) => {
    try {
        const hari = req.query.hari ? [req.query.hari.toLowerCase()] : validDays;
        if (!validDays.includes(hari[0])) {
            return res.status(400).json({ message: 'Hari tidak valid. Gunakan salah satu dari: senin, selasa, rabu, kamis, jumat, sabtu, minggu.' });
        }
        const jadwalHariIni = await JadwalHarian.findOne({ hari: hari[0] }).populate('menuTersedia');

        if (!jadwalHariIni || jadwalHariIni.statusToko === 'tutup') {
            return res.status(200).json([]); // Kembalikan array kosong jika tidak ada jadwal atau toko tutup
        }

        res.status(200).json(jadwalHariIni.menuTersedia);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports = { setWeeklySchedule, getWeeklySchedule, getDailyMenu };