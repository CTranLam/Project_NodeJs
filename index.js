const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const router = require("./router/client/index.router.js")
const routerAdmin = require("./router/admin/index.router.js")
const systemConfig = require('./config/system.js');

require('dotenv').config();

const database = require('./config/database.js');
database.connect();

const app = express();
const port = process.env.PORT;

// phải ghi sau app
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views'); 
app.set('view engine' , 'pug');
app.use(express.static('public'));

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routers
router(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})