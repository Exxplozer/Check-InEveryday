var express = require('express');
var path = require('path');
var http = require("http");
var mongoose = require('./libs/mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var HttpError = require('./error').HttpError;
var config = require('./config');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var app = express();

module.exports = app;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(require('./middleware/sendHttpError'));
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret : config.get('session:secret'),
    name : config.get('session:name'),
    key : config.get('session:key'),
    cookie : config.get('session:cookie'),
    store : new MongoStore({mongooseConnection : mongoose.db.connection}),
    proxy : true,
    resave : true,
    macAge : 259200000,
    saveUninitialized : true
}));

require('./routes')(app);

app.use(function (err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        console.log(err);
        res.sendHttpError(err);
    } else {
        err = new HttpError(err);
        res.sendHttpError(err);
    }
    next();
});
//*
setInterval(function () {
    mongoose.FindCurrentCheckin();
}, 500);
// */

setInterval(function () {
    var options = {
        path: '/AreYouOK',
        host: 'checkineveryday.herokuapp.com',
        method: 'GET'
    };

      var req =   http.request(options, function (res)
        {
            console.log("Are you ok: " + res.statusCode);
        });

    req.on('error', function (err) {
            console.error(err);
        });
    req.end();
}, 1800000);