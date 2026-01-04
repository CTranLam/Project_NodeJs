const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

// model là bộ khung buộc phải tuân theo khi lưu trữ dữ liệu trong MongoDB
const productSchema = new mongoose.Schema(
    {
        title: String, // San pham 1
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
        // Để sinh slug tự động từ title, slug là duy nhất nếu trùng sẽ tự thêm số đằng sau
        slug: {
            type: String,
            slug: "title", // San-pham-1
            unique: true 
        }
    },
    { 
        timestamps: true 
    }
);

const Product = mongoose.model('Product', productSchema, 'products'); // 'products' is the name of the collection in MongoDB

module.exports = Product;