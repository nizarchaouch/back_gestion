const express = require("express");
const router = express.Router();
const StagiService = require("./stagiService");

router.post("/addStagi", StagiService.addStagi);
router.get("/showStagi", StagiService.showStagi);
router.delete("/delStagi/:id", StagiService.deleteStagi);
router.put("/updateStagi/:id", StagiService.updateStagi);
module.exports = router;
