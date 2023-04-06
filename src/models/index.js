const mongoose = require("mongoose");

// Set Mongoose to use the global Promise object.
mongoose.Promise = global.Promise;

// Export an object with Mongoose and models.
module.exports = {
  mongoose: mongoose,
  task: require("./task.model"),
  user: require("./user.model"),
};
