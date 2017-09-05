var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views','./views');

//Require the Router we defined in policies.js
var policies = require('./policies.js');
var claims = require('./claims.js');
//Use the Router on the sub route /policies
app.use('/policies', policies);
app.use('/claims', claims);

app.listen(process.env.PORT || 3000);