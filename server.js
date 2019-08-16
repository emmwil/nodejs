/**
 * Developer : suraj Roy
 * Date : 17 April 2019
 * Source  : jsonworld.com
 */

/**
 * Module dependencies.
 */
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const morgan = require('morgan');
    
const mongoose = require('./Utilities/mongooseConfig')();

const loginRoute = require('./Routes/login');

const util = require('./Utilities/util');
const config = require("./Utilities/config").config;
const congnitoConfig = require("./Utilities/congnito-config").config;

/**
 * Express configuration.
 */
app.use("/media", express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/dist/')));

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(cors());

app.use((err, req, res, next) => {
  return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});

app.use('/auth', loginRoute);

// catch 404 and forward to error handler
app.use((req, res, next)=> {

    next();
}); 
       
  
/**
 * Start Express server.
 */
const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log('app listening on port:'+port);
});
