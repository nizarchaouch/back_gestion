const express = require("express");
const router = express.Router();
const assigService = require("./assignerService");

router.post("/AddAssg", assigService.addAssg);


module.exports = router;