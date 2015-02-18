var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;
var Location = require('./location').Location;
var Category = require('./category').Category;


var schema = new Schema({
    id :String,
    name : String,
    image: String,
    raitingColor: String,
    raiting : Number,
    location :Location,
    categories :Category
});

exports.Venue = mongoose.model('Venue', schema);