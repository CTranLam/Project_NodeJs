const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); // truyền route động
router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create); // Lấy ra trang tạo sản phẩm mới
router.post("/create", controller.createProduct); // Xử lý tạo sản phẩm mới
module.exports = router;
