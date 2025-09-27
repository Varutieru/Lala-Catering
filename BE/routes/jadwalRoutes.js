const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { setWeeklySchedule, getWeeklySchedule, getDailyMenu } = require('../controllers/jadwalController');

router.post('/', authMiddleware(['penjual']), setWeeklySchedule);           // POST /api/jadwal
router.get('/', authMiddleware(['penjual', 'pembeli']), getWeeklySchedule); // GET /api/jadwal
router.get('/daily', authMiddleware(['penjual', 'pembeli']), getDailyMenu); // GET /api/jadwal/daily

module.exports = router; 