var config = require('../config');
var checkin = require('../models/currentCheckin').Checkin;
var mongoose = require('../lib/mongoose');
var foursquare = require('node-foursquare')(config.get('foursquare'));

exports.get = function(req,res,next) {
    foursquare.Checkins.getRecentCheckins(null, req.params.token, function (error, data) {
        if (error) return next(error);
        res.json(data);
    });
};

exports.find = function (req, res, next) {
    mongoose.Find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
};

exports.addCheckins = function (req, res, next) {
   var countOfCheckins =
       24 / req.body.hours * req.body.days;

   new checkin({
            venueId: req.body.venueId,
            token : req.body.oauth_token,
            ll: req.body.ll,
            checkinDate: new Date(),
            count:  countOfCheckins
    }).save(function (err) {
           if(err) return next(err.statusCode);
           res.end();
       });
};