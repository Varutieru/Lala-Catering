const JadwalHarian = require('../models/JadwalHarian');

const validDays = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];

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

const getDailyMenu = async (req, res) => {
    try {
        const hari = req.query.hari ? req.query.hari.toLowerCase() : null;
        if (!hari) {
            return res.status(400).json({ message: 'Parameter hari harus disediakan.' });
        }
        
        if (!validDays.includes(hari)) {
            return res.status(400).json({ message: 'Hari tidak valid. Gunakan salah satu dari: senin, selasa, rabu, kamis, jumat, sabtu, minggu.' });
        }
        
        const jadwalHariIni = await JadwalHarian.findOne({ hari: hari }).populate('menuTersedia');

        if (!jadwalHariIni || jadwalHariIni.statusToko === 'tutup') {
            return res.status(200).json([]);
        }

        res.status(200).json(jadwalHariIni.menuTersedia);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { setWeeklySchedule, getWeeklySchedule, getDailyMenu };