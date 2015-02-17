var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var HttpError = require('./error').HttpError;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./middleware/sendHttpError'));

module.exports = app;

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