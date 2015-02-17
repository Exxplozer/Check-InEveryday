var express = require('express');
var path = require('path');
var mongoose = require('./lib/mongoose').db;
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./middleware/sendHttpError'));

app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.get('session:secret'),
    name: config.get('session:name'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    proxy: true,
    resave: true,
    key :config.get('session:key'),
    saveUninitialized: true
}));

require('./routes')(app);

app.use(function (err, req ,res, next) {
    if(typeof  err == 'number'){
        err = new HttpError(err);
    }
    
    if(err instanceof HttpError){
        console.log(err);
        res.sendHttpError(err);
    } else {
        console.log(err);
        err = new HttpError(500);
        res.sendHttpError(err);
    }
});