const express = require("express");
const router = express.Router();
const assigService = require("./assignerService");

router.post("/AddAssg", assigService.addAssg);
router.get("/ShowAssg", assigService.showAssg);


module.exports = router;