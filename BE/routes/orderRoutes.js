const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, checkout, handleMidtransCallback } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const Order = require('../models/Order');
const orderController = require('../controllers/orderController');

router.post('/', authMiddleware(['pembeli']), createOrder);
router.get('/', authMiddleware(['penjual']), getOrders);
router.put('/:id/status', authMiddleware(['penjual', 'pengantar']), updateOrderStatus);
router.post('/:id/checkout', authMiddleware(['pembeli']), checkout);
router.post('/payment/callback', handleMidtransCallback);
router.post('/', authMiddleware)
router.get('/:id/invoice', authMiddleware(['pembeli']), orderController.generateInvoice);

module.exports = router;