// GET / 
const dashboardRouters = require('./dashboard.router.js');
const systemConfig = require('../../config/system.js');
const productRouters = require('./product.router.js');
const productCategoryRouters = require('./product-category.router.js');
const roleRouters = require('./role.router.js');
const accountRouters = require('./account.router.js')
const authRouters = require('./auth.router.js')

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRouters);
    app.use(PATH_ADMIN + '/products', productRouters);
    app.use(PATH_ADMIN + '/products-category', productCategoryRouters);
    app.use(PATH_ADMIN + '/roles', roleRouters);
    app.use(PATH_ADMIN + '/accounts', accountRouters);
    app.use(PATH_ADMIN + '/auth', authRouters);
}