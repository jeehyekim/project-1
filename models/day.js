var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	body: String
});

var DaySchema = new Schema({
	name : String,
	todos: [TodoSchema]
});


var Day = mongoose.model('Day', DaySchema);

module.exports = Day;
