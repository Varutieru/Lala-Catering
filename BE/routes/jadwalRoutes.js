const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { setMenuSchedule, getTodayMenu, getScheduleByDay, getMenuByDay } = require('../controllers/jadwalController');

router.post('/', authMiddleware(['penjual']), setMenuSchedule);           // POST /api/jadwal
router.get('/today', authMiddleware(['penjual', 'pembeli']), getTodayMenu); // GET /api/jadwal/today
router.get('/daily', authMiddleware(['penjual', 'pembeli']), getScheduleByDay); // GET /api/jadwal/daily
router.get('/:hari', authMiddleware(['penjual', 'pembeli']), getMenuByDay); // GET /api/jadwal/:day

module.exports = router; 