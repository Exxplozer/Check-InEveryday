module.exports = function(app) {

    app.get('/', function(req, res, next){
        res.render('index', {
            token: 'PBWY02RDRFKH3RGW1XXURLYN0ECROCJTCQEINXJ03USCN2AG',
            ll : '40.7033127,-73.979681',
            query: 'Building',
            venueId: '49c2df9cf964a5203b561fe3'
        });
    });

    app.post('/api/checkin/add', require('./checkin').post); // add checkin in fouraquare

    app.post('/api/checkins/add/lol', require('./checkin').addCheckins); // error

    /* OK */ app.get('/api/checkins/:token', require('./checkin').get); // get user checkins

    /* OK */ app.get('/api/venues/:ll/:token/:query', require('./venue').getltq); // get venue near the by string

    /* OK */ app.get('/api/venues/:ll/:token/', require('./venue').get); // get venue near the user
};

// TEST
// token = PBWY02RDRFKH3RGW1XXURLYN0ECROCJTCQEINXJ03USCN2AG
// ll = 40.7033127,-73.979681 New York
// query = state