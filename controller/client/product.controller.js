// GET /products
const Product = require("../../models/product.model.js");

module.exports.index = async(req, res) => {
    const products = await Product.find({
        status: "active", 
        deleted: false
    }).sort({position: 1});

    const newProducts = products.map(item =>{
        item.priceNew = (item.price - (item.price * item.discountPercentage / 100)).toFixed(0);
        return item;
    })

    console.log(newProducts);
    
    res.render("client/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products: newProducts
    }); 
};
