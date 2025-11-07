const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { setMenuSchedule, getTodayMenu, getScheduleByDay, getMenuByDay } = require('../controllers/jadwalController');

router.post('/', authMiddleware(['penjual']), setMenuSchedule);     // POST /api/jadwal

router.get('/today', getTodayMenu);                                 // GET /api/jadwal/today
router.get('/week', getScheduleByDay);                              // GET /api/jadwal/week
router.get('/:hari', getMenuByDay);                                 // GET /api/jadwal/:day

module.exports = router; 