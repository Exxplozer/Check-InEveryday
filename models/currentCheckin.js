var mongoose = require('../lib/mongoose').db;

var checkin = mongoose.Schema({
    venueId : String,
    token: String,
    ll: String,
    checkinDate : String,
    count: Number,
    interval : Number
});

exports.Checkin = mongoose.model('checkin', checkin);