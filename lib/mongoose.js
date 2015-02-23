var config = require('../config');
var mongoose = require('mongoose');
var dateFormat = require('dateformat');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:config'));
var foursquare = require('node-foursquare')(config.get('foursquare'));
exports.db = mongoose;

var db = mongoose.connection;
var Checkin = require('../models/currentCheckin').Checkin;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

exports.InsertCheckin = function(newCheckin, callback){

    var checkin = new Checkin({
        venueId: newCheckin.venueId,
        token : newCheckin.token
    });

    console.log(checkin);
    checkin.save(callback);
};

exports.RemoveCheckin = function(id, callback){
    var ObjectId = mongoose.Schema.ObjectId;
    Checkin.find().remove({ _id: new ObjectId(id).path }).remove(callback)
};


exports.FindCurrentCheckin = function(){
 var date = new Date();
    Checkin.find({checkinDate: { $lte: new Date()}, count: { $gte: 0}}, function (err, data) {
        if(err) console.log(err);
        for(var i =0; i < data.length;i++) {
            var currentData = data[i];
            foursquare.Checkins.addCheckin(data[i].venueId, {v: dateFormat(date, "yyyymmdd")}, data[i].token, function (err, res) {
                if (err) {
                    console.log(err);
                    currentData.error += err;
                } else {
                    currentData.count = --currentData.count;
                }
                var newDate = new Date();
                newDate.setHours(newDate.getHours() + parseInt(currentData.interval));
                currentData.checkinDate = newDate;
                currentData.save(function (err) {
                    if(err) {
                        console.error('Save error!');
                    }
                });
            });
        }
    });
};

exports.Find = function () {
   var date = new Date();
    date.setHours(date.getHours() - parseInt("1"));
    Checkin.findOneAndUpdate({checkinDate: { $lt: date }},{checkinDate : new Date()},{multi: false}, function (err, docs, lol) {
      if(err)  console.log(err);
        if(lol)  console.log(lol);
        if(docs)  console.log(docs);
    })
};

exports.FindById = function (id, callback) {
    Checkin.findById(id ,callback);
};





