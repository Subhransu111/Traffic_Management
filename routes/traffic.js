const express= require("express");
const router = express.Router();
const report = require("../controllers/trafficController.cjs");

router.post("/report",report.Trafficreport);

module.exports = router;