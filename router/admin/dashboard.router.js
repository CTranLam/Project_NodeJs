
const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/dashboard.controller");

// gọi đến hàm dashboard
router.get("/", controller.dashboard);


module.exports = router;
