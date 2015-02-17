var mongoose = require('../lib/mongoose').db,
    Schema = mongoose.Schema;
var Location = require('./location').Location;
var Category = require('./category').Category;


var schema = new Schema({
    id :{type : String},
    name :{type : String},
    image:{type : String},
    raitingColor:{type : String},
    raiting :{type : Number},
    location :{type : Location},
    categories :{type : Category}
});

exports.Venue = mongoose.model('Venue', schema);