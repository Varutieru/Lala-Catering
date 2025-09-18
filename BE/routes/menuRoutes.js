<<<<<<< Updated upstream
const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, getDailyMenu } = require('../controllers/menuController');
const authMiddleware = require('../middleware/auth');

router.get('/', getMenuItems);                                  // GET /api/menu
router.post('/', authMiddleware(['penjual']), createMenuItem); // POST /api/menu
router.get('/daily', getDailyMenu);                            // GET /api/menu/daily

module.exports = router;
=======
const express = require("express");
const { getMenus, createMenu,getMenusByDay, getMenusGroupedbyDay, updateMenu, deleteMenu } = require("../controllers/menuController");


const menuRouter = express.Router();

menuRouter.get("/", getMenus);       // GET /api/menus
menuRouter.post("/", createMenu);    // POST /api/menus
menuRouter.get("/day/:day", getMenusByDay); // GET /api/menus/day/:day
menuRouter.get("/grouped", getMenusGroupedbyDay); // GET /api/menus/grouped
menuRouter.put("/:id", updateMenu); // PUT /api/menus/:id
menuRouter.delete("/:id", deleteMenu); // DELETE /api/menus/:id

module.exports = menuRouter;
>>>>>>> Stashed changes
