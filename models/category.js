var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;

var schema = new Schema({
    shortName : { type : String}
});

exports.Category = mongoose.model('Category', schema);
