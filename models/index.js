var mongoose = require("mongoose");
  mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL || 
                      3000  );

// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");

var db = mongoose.connect;
console.log("db is open for business");

module.exports.Todos = require('./todos.js');
