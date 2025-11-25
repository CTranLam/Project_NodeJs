const Product = require("../../models/product.model.js");
// GET /admin/products
module.exports.index= async(req, res)=>{
    const currentStatus = req.query.status || "";
    const filterStatus = [
        { name: "Tất cả", status: "" },
        { name: "Hoạt động", status: "active" },
        { name: "Dừng hoạt động", status: "inactive" }
    ];
    let find = {
        deleted: false
    }
    if(req.query.status){
        // thêm field vào object 
        find.status = req.query.status;
    }

    const products = await Product.find(find)
    res.render("admin/pages/products/index", {
        pageTitle : "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        currentStatus : currentStatus
    });
};