const express= require("express");
const router = express.Router();
const report = require("../controllers/trafficController.js");

router.post("/report",report.Trafficreport);


module.exports = router;