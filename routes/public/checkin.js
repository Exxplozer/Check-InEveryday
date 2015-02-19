var checkin= require('../../models/currentCheckin').Checkin;

exports.addCheckin = function (req, res, next) {
    var countOfCheckins =
        24 / req.body.hours * req.body.days;
var date = new Date();
 new checkin({
        venueId: req.body.venueId,
        token : req.body.oauth_token,
        ll: req.body.ll,
        checkinDate: date,
        interval : req.body.hours,
        count:  countOfCheckins
    }).save(function (err) {
         console.log(date);
            if(err) return next(err.statusCode);
            res.end();
    });
};