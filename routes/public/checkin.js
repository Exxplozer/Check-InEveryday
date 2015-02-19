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