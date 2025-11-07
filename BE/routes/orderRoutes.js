const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, checkout, handleMidtransCallback, myOrders, generateInvoice } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const Order = require('../models/Order');
const orderController = require('../controllers/orderController');

router.post('/', authMiddleware(['pembeli']), createOrder);                     // POST /api/orders
router.get('/:id/invoice', authMiddleware(['pembeli']), generateInvoice);       // GET /api/orders/:id/invoice
router.get('/myorders', authMiddleware(['pembeli']), myOrders);                 // GET /api/orders/myorders
router.post('/:id/checkout', authMiddleware(['pembeli']), checkout);            // POST /api/orders/:id/checkout

router.get('/', authMiddleware(['penjual']), getOrders);                        // GET /api/orders
router.put('/:id/status', authMiddleware(['penjual']), updateOrderStatus);      // PUT /api/orders/:id/status


router.post('/payment/callback', handleMidtransCallback);                       // POST /api/orders/payment/callback


module.exports = router;