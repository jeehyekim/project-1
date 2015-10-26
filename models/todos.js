var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	todo: String
});

var DaySchema = new Schema({
	day : Date,
	todos: [{type: Schema.Types.ObjectId, ref: 'Todos'}]
});

var PlanSchema = new Schema({
	days: [{type: Schema.Types.ObjectId, ref: 'Days'}]
});


var Todos = mongoose.model('Todos', TodoSchema);
var Days = mongoose.model('Days', DaySchema);
var Plans = mongoose.model('Plans', PlanSchema);

module.exports = Todos;
