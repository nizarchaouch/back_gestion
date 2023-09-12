const express = require("express");
const router = express.Router();
const demaService = require("./demaService");

router.post("/addDemande", demaService.addDemande);
router.get("/showDemande", demaService.showDemande);
router.put("/accept/:id", demaService.accept);
router.delete("/refuse/:id", demaService.refuse);
module.exports = router;
