var config = require('../../config/index');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');
var converter =require('../../lib/converter');

exports.get = function(req,res,next){

    var now = new Date();
    var  l1, l2;
    l1 = req.params.ll.split(',')[0];
    l2 = req.params.ll.split(',')[1];

    foursquare.Venues.explore(l1,l2, null, {
            venuePhotos : 1,
            v :dateFormat(now, "yyyymmdd")},
        req.params.token,
        function (error, data) {
            if (error) return next(error);
            res.json(converter.ConvertVenues(data));
        });
};

exports.getByString = function(req,res,next){

    var now = new Date();
    var  l1, l2;
    l1 = req.params.ll.split(',')[0];
    l2 = req.params.ll.split(',')[1];
    foursquare.Venues.explore(l1,l2, null,{
            query : req.params.query,
            venuePhotos:1,
            v : dateFormat(now, "yyyymmdd")},
        req.params.token,
        function (error, data) {
            if (error) return next(error);
            res.json(converter.ConvertVenues(data));
        });
};