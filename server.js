// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//MIDDLEWARE
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  'mongodb://localhost/weekly-plan'  );

var Plan = require('./models/plan.js');
var Day = require('./models/day.js');

//ROUTES
app.get('/', function(req, res) {
  res.render("index");
});

//home
app.get('/home', function(req, res) {
	Plan.find({}, function(err,plan) {
		if(err) console.log(err);
  		res.render("home");
	});
});

app.post('/plans', function(req, res) {
	var plan = req.body;
	console.log("my plan is: " + plan.title);
	Plan.create(plan, function(err, plan) {
		console.log("plan title is:" + plan.title);
		var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
		for(var i in days) {
			Day.create({name: days[i]});
			console.log(days[i]);
				// plan.days.push(Day);
				// plan.save();
				
		}
				res.json(plan);
	});
});

app.get('/plans/:id', function(req, res) {
	Plan.findById(req.params.id, function(err, plan) {
		if(err) {
			console.log(err);
		}else {
		res.render('plan-show', {plan: plan});
		}
	});
});

console.log("It lives!");


 app.listen(process.env.PORT || 3000);







