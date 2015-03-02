var config = require('../../config/index');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');

exports.get = function (req, res, next) {
    var now = new Date();

    foursquare.Users.getCheckins(null, {
        limit: 2,
        v: dateFormat(now, "yyyymmdd")
    }, req.params.token, function (error, data) {
        if (error) {
            return next(error);
        }

        res.json(data);
    });
};