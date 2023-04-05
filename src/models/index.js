const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    mongoose: mongoose,
    Task: require('./task.model'),
    User: require('./user.model')
};