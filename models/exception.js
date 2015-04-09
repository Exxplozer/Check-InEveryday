var mongoose = require('../libs/mongoose').db;

var exception = mongoose.Schema({
    message : String,
    Target : String,
    StackTrace: String
});

exports.Exception = mongoose.model('checkin', exception);