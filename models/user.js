var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true},
	created_at: Date
});

var User = mongoose.model('User', UserSchema);

module.exports = User;