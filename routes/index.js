module.exports = function (app) {



     /* analytics */
    app.get('/analytics/venues', function (req, res) {

        res.render("analytics/index");
    });

    app.get('/analytics/checkins', function (req, res) {

        res.render("analytics/index");
    });

    app.get('/analytics/schedule', function (req, res) {

        res.render("analytics/index");
    });

    app.get('/analytics/settings', function (req, res) {

        res.render("analytics/index");
    });

    app.get('/analytics/login', function (req, res) {

        res.render("analytics/index");
    });


    /* public */
    app.get('/', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.redirect("/methods?code=" + accessToken);
        } else {
            res.render('index');
        }
    });

    app.get('/AreYouOk', function (req, res) {
       res.end("I am");
    });

    app.get('/login', require('./public/oauth').login);

    app.get('/callback', require('./public/oauth').callback);

    app.post('/checkin/add', require('./public/checkin').addCheckin);

    /* api */
    app.get('/api/checkins/:token', require('./api/checkin').get);

    app.get('/api/venues/:ll/:token/:query', require('./api/venue').getByString);

    app.get('/api/venues/:ll/:token', require('./api/venue').get);

    /* mobile api */
    app.get('/mobile-api/checkins/:token', require('./mobile.api/checkin').get);

    app.get('/mobile-api/venues/:ll/:token/:query', require('./mobile.api/venue').getByString);

    app.get('/mobile-api/venues/:ll/:token', require('./mobile.api/venue').get);

    app.get('/mobile-api/schedule/:token', require('./mobile.api/checkin').getSchedule);

    app.post('/mobile-api/deleteCheckin', require('./mobile.api/checkin').deleteCheckinFromSchedule);

    app.put('/mobile-api/restart', require('./mobile.api/checkin').restart);

    /* UI */
    app.get('/methods', function (req, res) {
        var accessToken = req.session.token;


        if (accessToken) {
            res.render("methods/methods");
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/api/postAddCheckins', function (req, res) {
        var accessToken = req.session.token;
        if (accessToken) {
            res.render('methods/api/postAddCheckins', {
                token : "QPWRP0U5DGU0PXJBUBVHOWLD1NJM32ONTNANMXHJSBCHZYV0",
                ll : '40.7033127,-73.979681',
                query : 'Empire',
                venueId : '49c2df9cf964a5203b561fe3',
                venueName : 'Apple Store, West 14th Street'
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/api/getCheckins', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/api/getCheckins", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/api/getVenuesByString', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/api/getVenuesByString", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/api/getVenues', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/api/getVenues", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/mobile-api/getCheckins', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/mobile-api/getCheckins", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/mobile-api/getVenues', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/mobile-api/getVenues", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/mobile-api/getVenuesByString', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/mobile-api/getVenuesByString", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/mobile-api/getSchedule', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/mobile-api/getSchedule", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/mobile-api/postDeleteCheckinFromSchedule', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/mobile-api/postDeleteCheckinFromSchedule", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });

    app.get('/methods/mobile-api/putRestart', function (req, res) {
        var accessToken = req.session.token;

        if (accessToken) {
            res.render("methods/mobile-api/putRestart", {
                token : accessToken
            });
        } else {
            res.redirect("/");
        }
    });
};