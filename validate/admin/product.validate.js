module.exports.createPost = (req, res, next)=>{
    if(!req.body.title){
        req.flash("error", "Vui lòng nhập tiêu đề");
        res.redirect("/admin/products");
        return;
    }
    // hàm midleware do express viết
    next(); // chuyển sang bước kế tiếp
}