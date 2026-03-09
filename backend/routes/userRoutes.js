const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", (req,res)=>{
    res.cookie("token", "", {
        httpOnly:true,
        expires: new Date(0), //expire cookie
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    res.json({ message: "Logged out successfully" });
})

module.exports = router;