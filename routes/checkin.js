var config = require('../config');
var request = require('request');
var mongoose = require('../lib/mongoose');
var foursquare = require('node-foursquare')(config.get('foursquare'));

exports.post = function(req,res,next) {

    var uri = "https://api.foursquare.com/v2/checkins/add?clientId="+
        config.get("foursquare:secrets:clientId")+
        "&clientSecret="+
        config.get("foursquare:secrets:clientSecret")+
        "&v=20150216&venueId="+req.body.venueId+"&oauth_token="+req.body.oauth_token+"&ll="+req.body.ll;

    console.log(uri);
    request.post({
        headers: {'content-type': 'application/json'},
        url: uri,
        json: null
    }, function (error, response, body) {
        if (error) return next(error);
        console.log(body);
    });
};

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
    var hours = req.body.hours;
    var days = req.body.days;
    var newCheckin ={
            venueId: req.body.venueId,
            token : req.body.token,
            ll: req.body.ll,
            date: new Date()
    };

    for(i = 0; i < days; i++)
    {
        for(j = 0 ; j < (24/hours); j++)
        {
          /*mongoose.InsertCheckin(newCheckin, function (err, data) {
                if (err) return next(err);
            })*/
            newCheckin.date.setHours(newCheckin.date.getHours() + parseInt(hours));
        }
    }
    res.end();
};

