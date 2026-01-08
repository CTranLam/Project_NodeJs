const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });



const controller = require("../../controller/admin/product.controller");
const validate = require("../../validate/admin/product.validate");
router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); // truyền route động
router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create); // Lấy ra trang tạo sản phẩm mới

router.get("/edit/:id", controller.edit);

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.post("/create", upload.single("thumbnail"),
    uploadCloud.uploadCloudinary,
    validate.createPost, // midleware
    controller.createProduct); // Xử lý tạo sản phẩm mới


router.patch("/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadCloudinary,
    validate.createPost,
    controller.editPatch);

router.get("/detail/:id", controller.detail);

module.exports = router;