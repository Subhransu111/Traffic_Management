const express= require("express");
const router = express.Router();


router.get("/status",(req,res)=>{
    res.json({status: "Traffic API is working fine"});
})

module.exports = router;