const express = require("express");
const router = express.Router();
const FormService = require("./formService");

router.post("/addForm", FormService.addForm);

module.exports = router;