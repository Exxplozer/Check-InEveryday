var Сheckin = require('../../models/currentCheckin').Checkin;

exports.addCheckin = function (req, res, next) {
    if(req.body.oauth_token && req.body.venueId ) {
        var countOfCheckins =
            24 / req.body.hours * req.body.days;

        var date = new Date();

        new Сheckin({
            venueId: req.body.venueId,
            venueName: req.body.venueName,
            token: req.body.oauth_token,
            ll: req.body.ll,
            checkinDate: date,
            interval: req.body.hours,
            count: countOfCheckins.toFixed()
        }).save(function (err) {
                if (err) {
                    console.log(err);
                    res.end('Error');
                }
                res.end('OK');
            });
    } else {
        res.end('Error');
    }
};