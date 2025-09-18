<<<<<<< Updated upstream
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', registerUser);         // POST /api/users/register
router.post('/login', loginUser);               // POST /api/users/login
router.post('/auth/google', googleLogin);       // POST /api/users/auth/google
router.get('/profile',  authMiddleware(['pembeli','penjual']), getUserProfile);         // GET /api/users/profile

module.exports = router;
=======
const express = require("express");
const { getUsers, createUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);          // GET /api/users
userRouter.post("/", createUser);       // POST /api/users
userRouter.post("/login", loginUser);   // POST /api/users/login

module.exports = userRouter;
>>>>>>> Stashed changes
