const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure to import bcryptjs

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
        required: true,
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

// Asynchronous middleware for hashing the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    
    next();
});

// Asynchronous method to compare the entered password with the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;