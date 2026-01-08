const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const controller = require("../../controller/admin/product-category.controller");
const validate = require("../../validate/admin/product-category.validate");

router.get("/", controller.index);

router.get("/create", controller.create);

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.post("/create", upload.single("thumbnail"),
    uploadCloud.uploadCloudinary,
    // validate.createPost, // midleware
    controller.createProduct); // Xử lý tạo sản phẩm mới

module.exports = router;