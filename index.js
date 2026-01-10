require('dotenv').config();

const express = require('express');
const path = require('path')
const methodOverride = require('method-override');
const flash = require("express-flash");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require("./router/client/index.router.js")
const routerAdmin = require("./router/admin/index.router.js")
const systemConfig = require('./config/system.js');


const database = require('./config/database.js');
database.connect();

const app = express();
const port = process.env.PORT;

// phải ghi sau app
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// Flash
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}));

app.use(flash());

// End Flash

app.set('views', `${__dirname}/views`); 
app.set('view engine' , 'pug');

app.use(express.static(`${__dirname}/public`));

// Tiny mce 
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules/tinymce"))
);
// End Tiny mce

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routers
router(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})