var config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:config'));
exports.db = mongoose;

var db = mongoose.connection;
var Checkin = require('../models/currentCheckin').Checkin;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

exports.InsertCheckin = function(newCheckin, callback){

    var checkin = new Checkin({
        venueId: newCheckin.venueId,
        token : newCheckin.token,
        ll: newCheckin.ll,
        checkinDate: newCheckin.date
    });

    console.log(checkin);
    checkin.save(callback);
};

exports.FindCheckin = function(date, callback){
    var query = { checkinDate: date };
    Checkin.findOne(query, callback);
};

exports.RemoveCheckin = function(id, callback){
    var ObjectId = mongoose.Schema.ObjectId;
    Checkin.find().remove({ _id: new ObjectId(id).path }).remove(callback)
};

exports.FindCurrentCheckin = function(callback){
    Checkin.find({ checkinDate:  Date()}, callback);
};

exports.Find = function (callback) {
    Checkin.find(callback);
};

exports.FindById = function (id, callback) {
    Checkin.findById(id ,callback);
};





