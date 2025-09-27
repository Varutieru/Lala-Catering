const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem} = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/auth');
<<<<<<< HEAD

router.get('/', getMenuItems);
router.post('/', authMiddleware(['penjual']), upload.single('gambar'), createMenuItem);
=======
const { getDailyMenu } = require('../controllers/jadwalController');

router.get('/', getMenuItems);
router.post('/', authMiddleware(['penjual']), createMenuItem);
router.get('/daily', getDailyMenu);  
>>>>>>> e5ee02d2db43f59ca5ccbe80ff50e0fadfde52be

module.exports = router;