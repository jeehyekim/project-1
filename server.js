// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');

//MIDDLEWARE
//set ejs as view engine
app.set("view engine", "ejs");
// serve js & css files
app.use(express.static("public"));
 // body parser config to accept our datatypes
app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
// 	saveUnitialized: true,
// 	resave: true,
// 	secret: "SuperSecret",
// 	cookie: { maxAge: 60000}
// }));

mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  'mongodb://localhost/weekhack'  );

var Plan = require('./models/plan.js');
var Day = require('./models/day.js');
var User = require('./models/user.js');


//ROUTES
// index , start page
app.get('/', function(req, res) {
  res.render("index");
});

//home - what user sees after logging in
app.get('/home', function(req, res) {
	Plan.find({}).limit(10).populate('days').exec(function(err,plans) {
		if(err) console.log(err);
  		res.render("home", {plans: plans});
	});
});


// sign up route
app.get('/signup', function (req, res) {
  res.render('home');
});

// create new user / sign up
app.post('/users', function(req, res) {
	console.log('request email: ', req.body.email);
	res.json('create user works');
});


app.get('/', function(req, res) {
	console.log("login after signing up");
});


app.post('/users', function (req, res) {
  // use the email and password to authenticate here
  User.createSecure(req.body.email, req.body.password, function (err, user) {
    res.json(user);
  });
});


// createDays function - callback
// function createDays(callback) {
// 	var daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// 	var days = [];

// 	for  (var i in daysList) {
// 		console.log(daysList[i]);
// 		Day.create({name: daysList[i]}, function(err, day) {
// 			if(err) console.log(err);
// 			days.push(day);
// 			console.log(day);
// 			if (i == daysList.length-1) {
// 				console.log('hi');
// 				callback(days);
// 			}
// 		});
// 	}
// }
	

// create new plan - repeating days
app.post('/plans', function(req, res) {
	// console.log("req.body is: " ,req.body);
	var plan = req.body;
	plan = new Plan(plan);


	Plan.create(plan, function(err, plan) {
		if (err) console.log(err);
		// console.log(plan);
		// console.log("plan title is:" + plan.title);
		var daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var days = [];
		for(var i = 0; i<daysList.length; i++) {
				var day = { name: daysList[i] };
				days.push(day);
		}
		// console.log(days);
		Day.create(days, function(err, days) {
			console.log(days);
			plan.days = days;
			plan.save(function(err, days) {
			// console.log('plan=', plan);
			// console.log('days = ',days);
			res.json(plan);	
			});
		});
	});
});

// show new plan template
app.get('/plans/:id', function(req, res) {
	Plan.findById(req.params.id).populate('days').exec(function (err, plan) {
		if(err) {
			console.log(err);
		}else {
			console.log("new created plan is: " ,plan);
			res.render('plan-show', {plan: plan});	
		}
	});

});

// create new todos
app.post('/days/:id/todos', function(req, res) {
	// console.log("new created todo: ", req.body);
	var todo = req.body;
	Day.findById(req.params.id).exec(function(err, day) {
		day.todos.push(todo);
		day.save();
		res.status(201).json(todo);
	});
});

app.get('/home', function(req, res) {
	
});


// for(var i = 0; i<daysList.length; i++) {
// 	Day.create({name: daysList[i]}, function(err, day) {
// 		if(err) console.log(err);
// 		console.log(day);
// 		days.push(day);
// 	});
// }

// create new plan. trying to repeat
// app.post('/plans2', function(req, res) {
// 	console.log(req.body);
// 	var plan = req.body;
// 	plan = new Plan(plan);

// 	createDays(function (days) {	
// 		console.log(days);
// 		plan.days = days;
// 		plan.save(function(err, plan) {
// 			console.log(err);
// 			console.log(plan);
// 			res.json(plan);	
// 		});
// 	});

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
// });


// createDays(function (days) {	
// 	console.log(days);
// 	plan.days = days;
// 	plan.save(function(err, plan) {
// 		console.log(err);
// 		console.log(plan);
// 		res.json(plan);	
// 	});
// });

console.log("It lives!");


app.listen(process.env.PORT || 3000);







