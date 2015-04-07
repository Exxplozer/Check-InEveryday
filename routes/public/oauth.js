var config = require('../../config/index');
var foursquare = require('simple_foursquare')(config.get('foursquare'));

exports.login = function (req, res) {
    res.writeHead(303, { 'location' : foursquare.getAuthClientRedirectUrl() });
    res.end();
};

exports.callback = function (req, res) {
    console.log(req.query.code);
    foursquare.getAccessToken({
        code: req.query.code
    }, function (err, accessToken) {
        if (err) {
            res.send('An error was thrown: ' + err.message);
        } else {
            console.log("get valid access token : " + accessToken);
            req.session.token = accessToken;
            res.redirect("/?code=" + accessToken);
        }
    });
};