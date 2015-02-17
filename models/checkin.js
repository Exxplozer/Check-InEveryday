var Venue = require('./venue').Venue;
var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;

var schema = new Schema({
    venue : { type : Venue},
    createdAt :{type : String},
    timeZoneOffset :{type : String}
});

exports.Checkin = mongoose.model('Checkin', schema);
