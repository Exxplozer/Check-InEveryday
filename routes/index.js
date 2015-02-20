module.exports = function(app) {

    /* public */
    app.get('/', function(req, res, next){
        var accessToken = req.session.token;
        console.error(accessToken);
        res.render('index', {
            token: accessToken,
            ll : '40.7033127,-73.979681',
            query: 'Empire',
            venueId: '49c2df9cf964a5203b561fe3'
        });
    });

    app.get('/login', require('./public/oauth').login);

    app.get('/callback', require('./public/oauth').callback);

    app.post('/checkin/add', require('./public/checkin').addCheckin);

    /* api */
    app.get('/api/checkins/:token', require('./api/checkin').get);

    app.get('/api/venues/:ll/:token/:query', require('./api/venue').getltq);

    app.get('/api/venues/:ll/:token/', require('./api/venue').get);

    /* mobile api */
    app.get('/mobile-api/checkins/:token', require('./mobile.api/checkin').get);

    app.get('/mobile-api/venues/:ll/:token/:query', require('./mobile.api/venue').getltq);

    app.get('/mobile-api/venues/:ll/:token', require('./mobile.api/venue').get);
};