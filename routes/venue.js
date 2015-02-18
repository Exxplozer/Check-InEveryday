var config = require('../config');
var foursquare = require('node-foursquare')(config.get('foursquare'));


exports.get = function(req,res,next){
    var  l1, l2;
    l1 = req.params.ll.split(',')[0];
    l2 = req.params.ll.split(',')[1];

    foursquare.Venues.explore(l1,l2, null, {}, req.params.token,function (error, data) {
        if (error) return next(error.statusCode);
        res.json(data);
    });
};

exports.getltq = function(req,res,next){

    var  l1, l2;
    l1 = req.params.ll.split(',')[0];
    l2 = req.params.ll.split(',')[1];


    foursquare.Venues.explore(l1,l2, null,
        {query : req.params.query}, req.params.token, function (error, data) {
            if (error) return next(error.statusCode);
            res.json(data);
        });
};