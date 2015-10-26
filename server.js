// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
// var db = require("./models/index");

//MIDDLEWARE
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//ROUTES
app.get('/', function(req, res) {
  res.render("index");
});

app.get('/home', function(req, res) {
  res.render("home");
});

app.get('/new', function(req, res) {
	res.render("create");
});

// app.get('/create',function(req, res){
// 	res.render('create')
// })

console.log("It lives!");


 app.listen(process.env.PORT || 3000);







