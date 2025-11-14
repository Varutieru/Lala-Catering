const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    setMenuSchedule,
    getTodayMenu,
    getScheduleByDay,
    getMenuByDay,
    setWeeklySchedule,
    getWeeklySchedule,
    clearWeeklySchedule
} = require('../controllers/jadwalController');

// ========================================
// RECURRING SCHEDULE (Old - Tetap dipakai)
// ========================================
router.post('/', authMiddleware(['penjual']), setMenuSchedule);     // POST /api/jadwal - Set recurring jadwal menu

// ========================================
// WEEKLY SCHEDULE (New - Multi-day order)
// IMPORTANT: Specific routes MUST come before dynamic routes!
// ========================================
router.post('/mingguan', authMiddleware(['penjual']), setWeeklySchedule);     // POST /api/jadwal/mingguan - Set quota mingguan
router.get('/mingguan', getWeeklySchedule);                                    // GET /api/jadwal/mingguan - Get jadwal minggu ini
router.delete('/mingguan', authMiddleware(['penjual']), clearWeeklySchedule); // DELETE /api/jadwal/mingguan - Clear jadwal minggu ini

// ========================================
// RECURRING SCHEDULE - Dynamic routes (must be last!)
// ========================================
router.get('/today', getTodayMenu);                                 // GET /api/jadwal/today - Menu hari ini (prioritize weekly schedule)
router.get('/week', getScheduleByDay);                              // GET /api/jadwal/week - Jadwal seminggu (prioritize weekly schedule)
router.get('/:hari', getMenuByDay);                                 // GET /api/jadwal/:hari - Menu per hari (prioritize weekly schedule)

module.exports = router; 