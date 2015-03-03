var Сheckin = require('../../models/currentCheckin').Checkin;

exports.addCheckin = function (req, res, next) {
    var countOfCheckins =
         24 / req.body.hours * req.body.days;

    var date = new Date();

 new Сheckin({
        venueId : req.body.venueId,
        VenueName : req.body.venueName,
        token : req.body.oauth_token,
        ll : req.body.ll,
        checkinDate : date,
        interval : req.body.hours,
        count :  countOfCheckins
    }).save(function (err) {
            if (err) {
                return next(err.statusCode);
            }

            res.end();
    });
};