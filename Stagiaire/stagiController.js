const express = require("express");
const router = express.Router();
const StagiService = require("./stagiService");

router.post("/addStagi", StagiService.addStagi);
router.get("/showStagi", StagiService.showStagi);
router.get("/showStagiId/:id", StagiService.showStagiId);
router.delete("/delStagi/:id", StagiService.deleteStagi);
router.put("/updateStagi/:id", StagiService.updateStagi);
router.put("/statut/:id", StagiService.statut)
module.exports = router;
