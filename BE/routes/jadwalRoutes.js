const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { setWeeklySchedule, getWeeklySchedule } = require('../controllers/jadwalController');

router.post('/', authMiddleware(['penjual']), setWeeklySchedule);
router.get('/', authMiddleware(['penjual', 'pembeli']), getWeeklySchedule);

module.exports = router; 