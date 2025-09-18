const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, getDailyMenu } = require('../controllers/menuController');
const authMiddleware = require('../middleware/auth');

router.get('/', getMenuItems);                                  // GET /api/menu
router.post('/', authMiddleware(['penjual']), createMenuItem); // POST /api/menu
router.get('/daily', getDailyMenu);                            // GET /api/menu/daily

module.exports = router;
