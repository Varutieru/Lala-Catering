const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    nama: { // Changed to nama for consistency
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.loginType === "traditional"; // hanya traditional yang wajib password
        },
        minlength: 6,
        select: false 
    },
    nomorTelepon: { 
        type: String,
        required: true
    },
    alamatPengiriman: { 
        type: String,
    },
    loginType: {
        type: String,
        enum: ['traditional', 'google'], 
        required: true
    },
    role: {
        type: String,
        enum: ['pembeli', 'penjual', 'pengantar'],
        default: 'pembeli'
    }
}, { timestamps: true });

// Hash password sebelum save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method untuk cek password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
