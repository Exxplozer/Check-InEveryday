var config = require('../config');
var mongoose = require('mongoose');
var dateFormat = require('dateformat');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:config'));
var foursquare = require('node-foursquare')(config.get('foursquare'));
exports.db = mongoose;

var db = mongoose.connection;
var Checkin = require('../models/currentCheckin').Checkin;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

exports.InsertCheckin = function(newCheckin, callback){

    var checkin = new Checkin({
        venueId: newCheckin.venueId,
        token : newCheckin.token
    });

    console.log(checkin);
    checkin.save(callback);
};

exports.RemoveCheckin = function(id, callback){
    var ObjectId = mongoose.Schema.ObjectId;
    Checkin.find().remove({ _id: new ObjectId(id).path }).remove(callback)
};

exports.FindCurrentCheckin = function(){
    var date = new Date();
    Checkin.find({checkinDate: date, count: { $gte: 0}}, function (err, data) {
        for(var i =0; i < data.length;i++){

            data[i].count = --data[i].count;

            var newdata = new Date(data[i].checkinDate);

            data[i].checkinDate = newdata.setHours(newdata.getHours() + parseInt(data[i].interval));

            foursquare.Checkins.addCheckin(data[i].venueId, {v: dateFormat(date, "yyyymmdd")}, data[i].token, function (err, res) {
                if (err) console.log(err);
                console.log(res);
            });

            data[i].save(function (err) {
            if(err) {
                console.error('ERROR!');
            }
        });
        }
    });
};

exports.Find = function (callback) {
    Checkin.find(callback);
};

exports.FindById = function (id, callback) {
    Checkin.findById(id ,callback);
};





