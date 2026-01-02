const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../helpers/filterStatus.js");
const searchHelper = require("../helpers/search.js");
// GET /admin/products
module.exports.index= async(req, res)=>{
    // Bộ lọc trạng thái
    const { currentStatus, filterStatus } = filterStatusHelper(req.query);

    // Tìm kiếm
    let find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status;// thêm field vào object 
    }
    const objectSearch = searchHelper(req.query);
    const keyword = objectSearch.keyword;
    if(objectSearch.regex){
        find.title = objectSearch.regex; // thêm field vào object 
    }

    //Pagination
    let objectPagination = {
        currentPage: 2,
        limitItems: 4

    };
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    countProducts = Product.countDocuments(find);
    // truy vấn vào trong DB là phải dùng await
    objectPagination.totalPage = Math.ceil((await countProducts) / objectPagination.limitItems);

    // end Pagination
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skipItems);

    res.render("admin/pages/products/index", {
        pageTitle : "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        currentStatus : currentStatus,
        keyword: keyword,
        pagination: objectPagination
    });
};