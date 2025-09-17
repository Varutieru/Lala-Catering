const express = require('express');
const router = express.Router();
const { sendOrderReadyNotification } = require('../controllers/notificationController'); // Asumsi Anda membuat controller
const authMiddleware = require('../middleware/auth');

router.post('/order-ready', authMiddleware(['penjual']), sendOrderReadyNotification);

module.exports = router;