var config = require('../../config/index');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var http = require('http');
var savedAccessToken;

exports.login = function(req, res) {
    res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
    res.end();
};

exports.callback = function(req, res){
    foursquare.getAccessToken({
        code: req.query.code
    }, function (err, accessToken) {
        if(err) {
            res.send('An error was thrown: ' + error.message);
        }
        else {
            console.log("get valid access token : " + accessToken);
            savedAccessToken = accessToken;
            req.session.token = accessToken;
            res.redirect("/");
        }
    });
};
