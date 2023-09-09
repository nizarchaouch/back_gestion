const express = require("express");
const router = express.Router();
const StagiService = require("./offerService");

router.post("/addOffer", StagiService.addOffer);
router.get("/showOffer", StagiService.showOffer);
router.delete("/delOffer/:id", StagiService.deleteOffer);
router.put("/updateOffer/:id", StagiService.updateOffer);
module.exports = router;
