const express = require("express");
const router = express.Router();
const adminService = require("./adminService");

router.post("/AddAdmin", adminService.addAdmin);
router.post("/login", adminService.login);

router.get("/showAdmin", adminService.showAdmins);
router.delete("/delAdmin/:id", adminService.deleteAdmin);
router.put("/updateAdmin/:id", adminService.updateAdmin);



module.exports = router;