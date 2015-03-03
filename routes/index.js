module.exports = function (app) {

    /* public */
    app.get('/', function (req, res) {
        var accessToken = req.session.token;
        res.render('index', {
            token : accessToken,
            ll : '40.7033127,-73.979681',
            query : 'Empire',
            venueId : '49c2df9cf964a5203b561fe3',
            venueName : 'Apple Store, West 14th Street'
        });
    });

    app.get('/login', require('./public/oauth').login);

    app.get('/callback', require('./public/oauth').callback);

    app.post('/checkin/add', require('./public/checkin').addCheckin);

    /* api */
    app.get('/api/checkins/:token', require('./api/checkin').get);

    app.get('/api/venues/:ll/:token/:query', require('./api/venue').getByString);

    app.get('/api/venues/:ll/:token/', require('./api/venue').get);

    /* mobile api */
    app.get('/mobile-api/checkins/:token', require('./mobile.api/checkin').get);

    app.get('/mobile-api/venues/:ll/:token/:query', require('./mobile.api/venue').getByString);

    app.get('/mobile-api/venues/:ll/:token', require('./mobile.api/venue').get);

    app.get('/mobile-api/history/:token', require('./mobile.api/checkin').getHistory);
};