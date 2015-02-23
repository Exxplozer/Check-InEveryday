var express = require('express');
var path = require('path');
var mongoose = require('./lib/mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var httpError = require('./error').HttpError;
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
    saveUninitialized : true
}));

require('./routes')(app);

app.use(function (err, req ,res, next) {
    if(typeof  err == 'number'){
        err = new httpError(err);
    }
    
    if(err instanceof httpError){
        console.log(err);
        res.sendHttpError(err);
    } else {
        console.log(err);
        err = new httpError(err);
        res.sendHttpError(err);
    }
});
setInterval( function(){
    mongoose.FindCurrentCheckin();
},500);