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


	// for(var i = 0; i<daysList.length; i++) {
	// 	Day.create({name: daysList[i]}, function(err, day) {
	// 		if(err) console.log(err);
	// 		console.log(day);
	// 		days.push(day);
	// 	});
	// }

function createDays(callback) {
	var daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var days = [];

	for  (var i in daysList) {
		console.log(daysList[i]);
		Day.create({name: daysList[i]}, function(err, day) {
			if(err) console.log(err);
			days.push(day);
			console.log(day);
			if (i == daysList.length) {
				console.log('hi');
				callback(days);
			}
		});
	}
}
	

// create new plan. trying to repeat
app.post('/plans', function(req, res) {
	console.log(req.body);
	var plan = req.body;
	plan = new Plan(plan);

	createDays(function (days) {	
		console.log(days);
		plan.days = days;
		plan.save(function(err, plan) {
			console.log(err);
			console.log(plan);
			res.json(plan);	
		});
	});

	// Plan.create(plan, function(err, plan) {
	// 	if (err) console.log(err);
	// 	console.log(plan)
	// 	// console.log("plan title is:" + plan.title);
	// 	// var daysList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	// 	// var days = [];
	// 	// for(var i = 0; i<daysList.length; i++) {
	// 	// 	var day = { plan: plan._id, name: daysList[i] }
	// 	// 	days.push(day);
	// 	// }
	// 	// Day.collection.insert(days, function(err, days) {
	// 	// 	res.json(plan);
	// 	// });
	// });
});

app.get('/plans/:id', function(req, res) {
	Plan.findById(req.params.id).populate('days').exec(function (err, plan) {
		if(err) {
			console.log(err);
		}else {
			res.render('plan-show', {plan: plan});	
		}
	});

});

console.log("It lives!");


 app.listen(process.env.PORT || 3000);







