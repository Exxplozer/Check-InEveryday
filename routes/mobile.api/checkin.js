var config = require('../../config/index');
var converter = require('../../libs/converter');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');
var mongoose = require('../../libs/mongoose');
var Сheckin = require('../../models/currentCheckin').Checkin;

exports.get = function (req, res, next) {
    var now = new Date();

    foursquare.Users.getCheckins(null, { limit : 50, v : dateFormat(now, "yyyymmdd") }, req.params.token,
        function (error, data) {
            if (error) {
                return next(error);
            }

            res.json(converter.ConvertCheckins(data));
    });
};


exports.getSchedule = function (req, res, next) {
    mongoose.Schedule(req.params.token, function (err, data) {
        res.json(converter.ConvertSchedule(data));
    });
};

exports.deleteCheckinFromSchedule = function (req, res, next) {

    Сheckin.findByIdAndRemove(req.body.id, function( err, data) {
        if(err) {
            console.log(err);
            res.end('Error');
        }
        res.end('OK');
    });
};

exports.restart = function (req, res, next) {
    var countOfCheckins =
        24 / req.body.hours * req.body.days;
    var date = new Date();


    Сheckin.findByIdAndUpdate(req.body.id, {count : countOfCheckins.toFixed(), interval : req.body.hours,
            checkinDate : date },
        function (err, data) {
            if(err) {
                console.log(err);
                res.end('Error');
            }
            res.end('OK');
    });
};