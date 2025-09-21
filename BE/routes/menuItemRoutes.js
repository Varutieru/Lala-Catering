const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem} = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/auth');
const { getDailyMenu } = require('../controllers/jadwalController');

router.get('/', getMenuItems);
router.post('/', authMiddleware(['penjual']), createMenuItem);
router.get('/daily', getDailyMenu);  

module.exports = router;