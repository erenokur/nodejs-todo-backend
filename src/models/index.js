const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.task = require("./task.model");
db.user = require("./user.model");
db.status = require("./status.model");

module.exports = db;