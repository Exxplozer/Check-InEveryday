var mongoose = require('../libs/mongoose').db;

var checkin = mongoose.Schema({
    venueId : String,
    venueName : String,
    token: String,
    ll: String,
    checkinDate : Date,
    count: Number,
    interval : Number,
    error : Array
});

exports.Checkin = mongoose.model('checkin', checkin);