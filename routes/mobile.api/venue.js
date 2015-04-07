var config = require('../../config/index');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');
var converter = require('../../libs/converter');

exports.get = function (req, res, next) {
    var now = new Date(),
        ll = req.params.ll.split(','),
        token = req.params.token;
    console.log(token);
    foursquare.Users.getUser('self', token,
        function (error, data) {
            if (error) {
                console.log(error);
                return next(error);
            }
            console.log(data);
           // res.json(converter.ConvertVenues(data));
            res.json(data);
        });
};

exports.getByString = function (req, res, next) {
    var now = new Date(),
        ll = req.params.ll.split(',');

    foursquare.Venues.explore(ll[0], ll[1], null, { query : req.params.query, venuePhotos : 1,
            v : dateFormat(now, "yyyymmdd")},
        req.params.token,
        function (error, data) {
            if (error) {
                console.log(error);
            }

            res.json(converter.ConvertVenues(data));
        });
};