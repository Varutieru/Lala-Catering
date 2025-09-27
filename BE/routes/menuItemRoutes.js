const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, upload } = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/auth');


// Ambil semua menu
router.get('/', getMenuItems);                      // GET /api/menu
// Tambah menu baru dengan upload gambar
// field form-data: nama, deskripsi, harga, stok, gambar (type file)
router.post(                                        // POST /api/menu
  '/',
  authMiddleware(['penjual']),
  upload.single('gambar'),
  createMenuItem
);

module.exports = router;
