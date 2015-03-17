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

exports.deleteCheckinFromSchedule = function (req, res, next) {

    var id =  mongoose.db.Types.ObjectId(req.body.id) ;
    Сheckin.findByIdAndRemove(id);
};