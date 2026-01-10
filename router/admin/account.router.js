const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const validate = require("../../validate/admin/account.validate");

const controller = require("../../controller/admin/account.controller");

router.get("/", controller.index);

router.get("/create", controller.create)

router.post("/create",
    upload.single("avatar"),
    uploadCloud.uploadCloudinary,
    validate.createPost, // midleware
    controller.createPost)

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
    upload.single("avatar"),
    uploadCloud.uploadCloudinary,
    validate.editPatch, // midleware
    controller.editPatch);

module.exports = router;