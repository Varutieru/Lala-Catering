const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { setMenuSchedule, getWeeklySchedule, getScheduleByDay } = require('../controllers/jadwalController');

router.post('/', authMiddleware(['penjual']), setMenuSchedule);           // POST /api/jadwal
router.get('/', authMiddleware(['penjual', 'pembeli']), getWeeklySchedule); // GET /api/jadwal
router.get('/daily', authMiddleware(['penjual', 'pembeli']), getScheduleByDay); // GET /api/jadwal/daily

module.exports = router; 