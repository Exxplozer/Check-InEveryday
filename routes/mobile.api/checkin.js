var config = require('../../config/index');
var converter = require('../../lib/converter');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');
var mongoose = require('../../lib/mongoose');

exports.get = function (req, res, next) {
    var now = new Date();

    foursquare.Users.getCheckins(null, { limit : 50, v : dateFormat(now, "yyyymmdd") }, req.params.token, function (error, data) {
        if (error) {
            return next(error);
        }

        res.json(converter.ConvertCheckins(data));
    });
};


exports.getHistory = function (req, res, next) {
    mongoose.History(req.params.token, function (err, data) {
        res.json(converter.ConvertHystory(data));
    });
};