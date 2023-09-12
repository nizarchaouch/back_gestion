const express = require("express");
const router = express.Router();
const demaService = require("./demaService");

router.post("/addDemande", demaService.addDemande);
router.get("/showStagi", demaService.showStagi);
router.delete("/delStagi/:id", demaService.deleteStagi);
router.put("/updateStagi/:id", demaService.updateStagi);
module.exports = router;
