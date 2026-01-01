const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../helpers/filterStatus.js");
// GET /admin/products
module.exports.index= async(req, res)=>{
    // Bộ lọc trạng thái
    const { currentStatus, filterStatus } = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }
    if(req.query.status){
        // thêm field vào object 
        find.status = req.query.status;
    }
    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword;

        const regex = new RegExp(keyword, 'i'); // 'i' không phân biệt hoa thường
        find.title = regex;
    }

    const products = await Product.find(find)
    res.render("admin/pages/products/index", {
        pageTitle : "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        currentStatus : currentStatus,
        keyword: keyword
    });
};