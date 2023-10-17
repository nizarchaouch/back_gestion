const express = require("express");
const router = express.Router();
const EncaService = require("./encadService");

router.post("/addEncad", EncaService.addEncad);
router.get("/showEncad", EncaService.showEncad);
router.delete("/delEncad/:id", EncaService.deleteEncad);
router.put("/updateEncad/:id", EncaService.updateEncad);
router.put("/statut/:id", EncaService.statut)
module.exports = router;
