var Venue = require('./venue').Venue;
var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;

var schema = new Schema({
    venue :  Venue,
    createdAt :String,
    timeZoneOffset :String
});

exports.Checkin = mongoose.model('Checkin', schema);
