const mongoose = require('mongoose');
const generate = require('../helpers/generate');

// model là bộ khung buộc phải tuân theo khi lưu trữ dữ liệu trong MongoDB
const accountSchema = new mongoose.Schema(
    {
        fullname: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
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

const Account = mongoose.model('Account', accountSchema, 'accounts'); // 'products' is the name of the collection in MongoDB

module.exports = Account;