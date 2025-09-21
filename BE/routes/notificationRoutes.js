const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/order-ready', authMiddleware(['penjual']));

module.exports = router;