var config = require('../../config/index');
var converter = require('../../libs/converter');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');
var mongoose = require('../../libs/mongoose');
var Сheckin = require('../../models/currentCheckin').Checkin;

exports.get = function (req, res, next) {
    var now = new Date();

    foursquare.Users.getCheckins(null, { limit : 50, v : dateFormat(now, "yyyymmdd") }, req.params.token, function (error, data) {
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

exports.deleteCheckinFromSked = function (req, res, next) {

    Сheckin.remove({ _id : mongoose.Types.ObjectId(req.params.id) }, function (err, data) {
        if (err) {
            console.log(err);
            res.end("error");
        }
res.end("Ok");
        console.log(data);
    });
};