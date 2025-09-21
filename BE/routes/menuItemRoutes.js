const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem} = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/auth');

router.get('/', getMenuItems);
router.post('/', authMiddleware(['penjual']), upload.single('gambar'), createMenuItem);

module.exports = router;