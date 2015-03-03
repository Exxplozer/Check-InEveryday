var mongoose = require('../lib/mongoose').db;

var checkin = mongoose.Schema({
    venueId : String,
    venueName : String,
    token: String,
    ll: String,
    checkinDate : Date,
    count: Number,
    interval : Number,
    error : Object
});

exports.Checkin = mongoose.model('checkin', checkin);