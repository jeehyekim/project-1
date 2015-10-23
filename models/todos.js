var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	todo: String
});


var Todos = mongoose.model('Todos', TodoSchema);


module.exports = Todos;