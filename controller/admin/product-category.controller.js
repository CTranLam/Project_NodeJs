const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");
// GET /admin/products-category
module.exports.index= async(req, res)=>{

    let find = {
        deleted: false
    }

    const record = await ProductCategory.find(find);

    res.render("admin/pages/products-category/index", {
        pageTitle : "Danh mục sản phẩm",
        records : record
    });
};

// GET /admin/products-category
module.exports.create= async(req, res)=>{

    res.render("admin/pages/products-category/create", {
        pageTitle : "Tạo danh mục sản phẩm",
    });
};

// POST /admin/products-category/create
module.exports.createProduct= async(req, res)=>{

    // console.log(req.body);

    // res.send("ok");
    if(req.body.position ==""){
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};