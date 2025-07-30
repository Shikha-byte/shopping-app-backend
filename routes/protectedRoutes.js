const express = require("express");
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.get("/dashboard", protect, (req, res)=>{
    res.json({ message: `Welcome, user ${req.user.userId}! You accessed a protected route.` });
})

module.exports = router;