const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const route = require('./router');
require('./config/dbConnect');

// create a write stream (in append mode) and set up logger
// var accessLogStream = fs.createWriteStream(path.join(__dirname, './access/access.log'), { flags: 'a' })
// app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
//set up ejs engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Route
route(app);


app.listen(3000, ()=> {
    console.log("server is starting");
})  