const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, getDailyMenu } = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/auth');

router.get('/', getMenuItems);
router.post('/', authMiddleware(['penjual']), createMenuItem);
router.get('/daily', getDailyMenu);  

module.exports = router;