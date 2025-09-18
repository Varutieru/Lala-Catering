const mongoose = require('mongoose');

const jadwalHarianSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        required: true,
        unique: true
    },
    menuTersedia: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }],
    statusToko: {
        type: String,
        enum: ['buka', 'tutup'],
        default: 'buka'
    }
});

module.exports = mongoose.model('JadwalHarian', jadwalHarianSchema);