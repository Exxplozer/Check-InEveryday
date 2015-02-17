var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;

var schema = new Schema({
    address : { type : String},
    city :{type: String}
});

exports.Location = mongoose.model('Location', schema);
