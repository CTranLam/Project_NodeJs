const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model");

const md5 = require("md5");
// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };

    const records = await Account.find(find).select("-password -token");

    for (const record of records){
        const role = await Role.findOne({
            deleted: false,
            _id : record.role_id
        });
        record.role = role
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
    });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find(
        {
            deleted : false
        }
    )
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles : roles
    });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email : req.body.email,
        deleted: false
    });

    if(emailExist){
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
    }else{
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        console.log(record);
    }

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
};