var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;

var schema = new Schema({
    address : String,
    city :String
});

exports.Location = mongoose.model('Location', schema);
