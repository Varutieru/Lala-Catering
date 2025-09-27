const mongoose = require('mongoose');

const jadwalHarianSchema = new mongoose.Schema({
    hari: {
        type: String,
        enum: ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'],
        required: true,
        unique: true // supaya tiap hari hanya ada satu dokumen
    },
    menuTersedia: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }],
    statusToko: {
        type: String,
        enum: ['buka', 'tutup'],
        default: 'buka'
    },
    jamBuka: {
        type: String,
        default: '08:00'
    },
    jamTutup: {
        type: String,
        default: '22:00'
    }
});

module.exports = mongoose.model('JadwalHarian', jadwalHarianSchema);
