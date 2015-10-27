var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlanSchema = new Schema({
	title: String,
	days: [{type: Schema.Types.ObjectId, ref: 'Day'}]
});

var Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
