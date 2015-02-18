module.exports = function(req, res, next) {
    res.sendHttpError = function(error) {
        console.log(error.status);
        console.log(error);
        res.status(error.status);
        res.json(error);
    };
    next();
};