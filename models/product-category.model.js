const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

// model là bộ khung buộc phải tuân theo khi lưu trữ dữ liệu trong MongoDB
const productCategorySchema = new mongoose.Schema(
    {
        title: String, // San pham 1
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
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

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category'); // 'products' is the name of the collection in MongoDB

module.exports = ProductCategory;