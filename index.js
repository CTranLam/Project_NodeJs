const express = require('express');
const router = require("./router/client/index.router.js")
require('dotenv').config();

const database = require('./config/database.js');
database.connect();

const app = express();
const port = process.env.PORT;


app.set('views', './views'); 
app.set('view engine' , 'pug');
app.use(express.static('public'));

//Routers
router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})