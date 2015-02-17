module.exports = function(app) {

    app.get('/', function(req, res, next){
        var accessToken = req.session.token;
        res.render('index', {
            token: accessToken,
            ll : '40.7033127,-73.979681',
            query: 'Building',
            venueId: '49c2df9cf964a5203b561fe3'
        });
    });

    app.get('/login', require('./oauth').login);

    app.get('/callback', require('./oauth').callback);

    app.post('/api/checkin/add', require('./checkin').post);

    app.post('/api/checkins/add/lol', require('./checkin').addCheckins);

    app.get('/api/checkins/:token', require('./checkin').get);

    app.get('/api/venues/:ll/:token/:query', require('./venue').getltq);

    app.get('/api/venues/:ll/:token/', require('./venue').get);
};