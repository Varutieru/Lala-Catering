const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, checkout, handleMidtransCallback, myOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['pembeli']), createOrder);                             // POST /api/orders
router.get('/', authMiddleware(['penjual']), getOrders);                                // GET /api/orders
router.put('/:id/status', authMiddleware(['penjual', 'pengantar']), updateOrderStatus); // PUT /api/orders/:id/status
router.post('/:id/checkout', authMiddleware(['pembeli']), checkout);                   // POST /api/orders/:id/checkout
router.post('/payment/callback', handleMidtransCallback);                               // POST /api/orders/payment/callback

router.get('/:id/invoice', authMiddleware(['pembeli']), orderController.generateInvoice); // GET /api/orders/:id/invoice
router.get('/myorders', authMiddleware(['pembeli']), myOrders);                       // GET /api/orders/myorders

module.exports = router;