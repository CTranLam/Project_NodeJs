// GET / 
const dashboardRouters = require('./dashboard.router.js');
const systemConfig = require('../../config/system.js');
const productRouters = require('./product.router.js');
const productCategoryRouters = require('./product-category.router.js');
const roleRouters = require('./role.router.js');
const accountRouters = require('./account.router.js')
const authRouters = require('./auth.router.js')

const authMiddleware = require('../../middlewares/admin/auth.middleware.js')

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRouters);

    app.use(PATH_ADMIN + '/products', 
        authMiddleware.requireAuth,
        productRouters);
    app.use(PATH_ADMIN + '/products-category', 
        authMiddleware.requireAuth,
        productCategoryRouters);
    app.use(PATH_ADMIN + '/roles', 
        authMiddleware.requireAuth,
        roleRouters);
    app.use(PATH_ADMIN + '/accounts', 
        authMiddleware.requireAuth,
        accountRouters);
    app.use(PATH_ADMIN + '/auth', authRouters);
}