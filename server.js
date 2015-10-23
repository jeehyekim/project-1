// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
// var db = require("./models/index");

var todos = [{name: "pay bills", _id: 1345654}, {name: "laundry", _id: 8767}];


var daily = [
		{ day: 'Monday',
		  todos: todos},
		{ day: 'Tuesday',
		  todos: todos},
		{ day: 'Wednesday',
		  todos: todos},
		{ day: 'Thursday',
		  todos: todos},
		{ day: 'Friday',
		  todos: todos},
		{ name: 'Saturday',
		  todos: todos},
		{ name: 'Sunday',
		  todos: todos}];

var graphicList = {
	name: "graphic design",
	//key: 'daily' value is from variable above. 
	daily: daily
};

var fishermanList = {
	name: "fishermen",
	daily: daily
};

var lists = [ graphicList, fishermanList];



app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
  res.render("index");
});

app.get('/home', function(req, res) {
  res.render("home");
});

console.log(lists);


 app.listen(process.env.PORT || 3000);







