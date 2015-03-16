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

exports.FindCurrentCheckin = function () {
 var date = new Date(),
     i = 0;

    Checkin.find({checkinDate: { $lte: new Date()}, count: { $gt: 0}}, function (err, data) {

        if (err) {
            console.log(err);
        }

        for (i; i < data.length; i++) {
            var currentData = data[i];

            foursquare.Checkins.addCheckin(data[i].venueId, {v : dateFormat(date, "yyyymmdd")}, data[i].token, function (err, res) {
                if (err) {
                    console.log(err);
                    currentData.error.puch(err);
                } else {
                    currentData.count = --currentData.count;
                }

                var newDate = new Date();
                newDate.setHours(newDate.getHours() + parseInt(currentData.interval));
                currentData.checkinDate = newDate;

                currentData.save(function (err) {
                    if (err) {
                        console.error('Save error!');
                    }
                });
            });
        }
    });
};

exports.Schedule = function (token, callback) {
    Checkin.find({token : token}, callback);
};




