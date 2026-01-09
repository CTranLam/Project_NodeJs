const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

// model là bộ khung buộc phải tuân theo khi lưu trữ dữ liệu trong MongoDB
const roleSchema = new mongoose.Schema(
    {
        title: String, // San pham 1
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    { 
        timestamps: true 
    }
);

const Role = mongoose.model('Role', roleSchema, 'roles'); // 'products' is the name of the collection in MongoDB

module.exports = Role;