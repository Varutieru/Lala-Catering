
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = async (req, res) => {
  try {
    const { nama, email, password, nomorTelepon, alamatPengiriman, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    const newUser = new User({
      nama, email, password, nomorTelepon, alamatPengiriman,
      loginType: 'traditional',
      role: role || 'pembeli'
    });
    await newUser.save();

    res.status(201).json({ message: 'Pendaftaran berhasil!', user: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || user.loginType !== 'traditional') {
      return res.status(401).json({ message: 'Email salah.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login berhasil!', user: { id: user.id, nama: user.nama, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();
    
    let user = await User.findOne({ email });
    
    if (user && user.loginType === 'traditional') {
        return res.status(400).json({ message: 'Akun ini sudah terdaftar dengan email dan password.' });
    }
    
    if (!user) {
      user = new User({
        nama: name,
        email: email,
        loginType: 'google',
        role: 'pembeli'
      });
      await user.save();
    }

    const payload = { user: { id: user.id, role: user.role } };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token: jwtToken,
      message: 'Login berhasil!',
      user: {
        _id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    return res.status(401).json({ message: 'Login gagal, token tidak valid.' });
  }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        res.json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, googleLogin, getUserProfile };
