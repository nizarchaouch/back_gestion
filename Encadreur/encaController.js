const express = require("express");
const router = express.Router();
const EncaService = require("./encaModel");

router.post("/addStagi", EncaService.addStagi);
router.get("/showStagi", EncaService.showStagi);
router.delete("/delStagi/:id", EncaService.deleteStagi);
router.put("/updateStagi/:id", EncaService.updateStagi);
module.exports = router;
