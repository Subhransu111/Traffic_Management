const express = require("express");
const {Loginuser,registeruser } = require("../controllers/user.js"); 
const router = express.Router();;

router.post("/register",registeruser);
router.post("/login",Loginuser);

module.exports = router;


