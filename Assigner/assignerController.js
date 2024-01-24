const express = require("express");
const router = express.Router();
const assigService = require("./assignerService");

router.post("/AddAssg", assigService.addAssg);
router.get("/ShowAssg", assigService.showAssg);
router.delete("/DelAssg/:id", assigService.deleteAssg);


module.exports = router;