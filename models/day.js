var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	body: String
});

var DaySchema = new Schema({
	// plan:  { type: Number, ref: 'Plan' },
	name : String,
	todos: [TodoSchema]
});

var Day = mongoose.model('Day', DaySchema);
// var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Day;
// module.exports = Todo;
