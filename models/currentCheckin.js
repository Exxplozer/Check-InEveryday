var mongoose = require('../lib/mongoose').db;

var checkin = mongoose.Schema({
    venueId : String,
    token: String,
    ll: String,
    checkinDate : Date
});
exports.Checkin = mongoose.model('checkin', checkin);