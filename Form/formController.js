const express = require("express");
const router = express.Router();
const FormService = require("./formService");

router.get("/showForm", FormService.showForm);
router.put("/addForm/:id", FormService.addForm);
router.put("/addForm", FormService.addForm);

module.exports = router;