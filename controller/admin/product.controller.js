const Product = require("../../models/product.model.js");

const systemConfig = require("../../config/system");
const filterStatusHelper = require("../helpers/filterStatus.js");
const searchHelper = require("../helpers/search.js");
const paginationHelper = require("../helpers/pagination.js");
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
    countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(req.query, {
        currentPage: 1,
        limitItems: 4
    }, countProducts);

    // end Pagination

    const products = await Product.find(find).sort({position: "desc"}).limit(objectPagination.limitItems).skip(objectPagination.skipItems);

    res.render("admin/pages/products/index", {
        pageTitle : "Danh sách sản phẩm",
        products: products,
        filterStatus : filterStatus,
        currentStatus : currentStatus,
        keyword: keyword,
        pagination: objectPagination
    });
};

// PATCH /admin/products/change-status/:status/:id
module.exports.changeStatus= async(req, res)=>{
    // console.log(req.params); lấy biến sau : khác req.query là sau ?
    const status = req.params.status;
    const id = req.params.id;

    // cập nhật product id nào với status nào
    await Product.updateOne({_id: id}, {status: status});

    req.flash("success", `Cập nhật trạng thái thành công cho sản phẩm`);
    res.redirect("/admin/products");
};

// PATCH /admin/products/change-multi
module.exports.changeMulti= async(req, res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(", "); // mảng id

    switch(type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            req.flash("success", `Cập nhật trạng thái thành công cho sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            req.flash("success", `Cập nhật trạng thái thành công cho sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {deleted: true, deletedAt: Date.now()});
            req.flash("success", `Cập nhật trạng thái thành công cho sản phẩm`);
            break;
        case "change-position":
            for (const item of ids){
                const [id, position] = item.split("-"); // tách id và position
                await Product.updateOne({_id: id}, {position: Number(position)});
            }
            req.flash("success", `Cập nhật trạng thái thành công cho sản phẩm`);
            break;
        default:
            break;
    };

    res.redirect("/admin/products");
};

// DELETE /admin/products/delete/:id
module.exports.deleteItem= async(req, res)=>{
    const id = req.params.id;

    await Product.updateOne({_id: id}, {deleted: true, deletedAt: Date.now()});

    res.redirect("/admin/products");
};

// GET /admin/products/create
module.exports.create= async(req, res)=>{
    res.render("admin/pages/products/create", {
        pageTitle : "Thêm sản phẩm mới"
    });
}

// POST /admin/products/create
module.exports.createProduct= async(req, res)=>{
    
    // console.log(req.file);
    // console.log(req.body); 
    req.body.price = Number(req.body.price);
    req.body.discountPercentage = Number(req.body.discountPercentage);
    req.body.stock = Number(req.body.stock);

    if(req.body.position ==""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    // console.log(product);
    await product.save();

    req.flash("success", `Thêm sản phẩm mới thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// GET /admin/products/edit/:id
module.exports.edit= async(req, res)=>{
    // console.log(req.params.id)
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        console.log(product)
        res.render("admin/pages/products/edit", {
            pageTitle : "Chỉnh sửa sản phẩm",
            product : product
        });
    }catch(error){
        console.log("lỗi")
    }
}

// PATCH /admin/products/edit/:id
module.exports.editPatch= async(req, res)=>{
    // console.log(req.body);
    // res.send("OK")
    req.body.price = Number(req.body.price);
    req.body.discountPercentage = Number(req.body.discountPercentage);
    req.body.stock = Number(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }


    try{
        await Product.updateOne({_id: req.params.id}, req.body);
    }catch(error){
        console.log(error)
    }

    req.flash("success", `Cập nhật sản phẩm thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
};