var Exception = require('../../models/exception').Exception;

exports.put = function (req, res, next) {
      new Exception({
            message : req.body.message,
            Target : req.body.targetSite,
            StackTrace: req.body.stackTrace
        }).save(function (err) {
              if (err) {
                  console.log(err);
                  res.end('Error');
              }
              res.end('OK');
          });
};
