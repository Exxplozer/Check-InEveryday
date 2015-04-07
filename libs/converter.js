exports.ConvertCheckins = function (data) {
    var checkins = [],
        i  = 0;

    for (i; i < data.checkins.items.length; i++) {
        var checkin = {
            name : data.checkins.items[i].venue.name,
            createdAt : data.checkins.items[i].createdAt,
            timeZoneOffset : data.checkins.items[i].timeZoneOffset
        };

        checkins.push(checkin);
    }

    return checkins;
};

exports.ConvertVenues = function (data) {
    var venues = [],
        specials = [],
        j = 0,
        i  = 0;

    for (i; i < data.groups[0].items.length; i++) {
        var venue = {
            id :  data.groups[0].items[i].venue.id,
            name : data.groups[0].items[i].venue.name,
            location : {
              lat : data.groups[0].items[i].venue.location.lat,
              lng : data.groups[0].items[i].venue.location.lng,
              city : data.groups[0].items[i].venue.location.city,
              country : data.groups[0].items[i].venue.location.country

            },
            categories : {
                shortName :  data.groups[0].items[i].venue.categories[0].shortName
            },
            previewPhoto : data.groups[0].items[i].venue.photos.groups[0] ? {
                    prefix : data.groups[0].items[i].venue.photos.groups[0].items[0].prefix,
                    suffix : data.groups[0].items[i].venue.photos.groups[0].items[0].suffix,
                    width  : data.groups[0].items[i].venue.photos.groups[0].items[0].width,
                    height : data.groups[0].items[i].venue.photos.groups[0].items[0].height
                 } : null,

            specials : data.groups[0].items[i].venue.specials ? {
                message: data.groups[0].items[i].venue.specials.items[0] ? data.groups[0].items[i].venue.specials.items[0].message : null,
                finePrint: data.groups[0].items[i].venue.specials.items[0] ? data.groups[0].items[i].venue.specials.items[0].finePrint : null
            } : null,
            rating : data.groups[0].items[i].venue.rating,
            ratingColor : data.groups[0].items[i].venue.ratingColor
        };


        if (!venue.previewPhoto) {
            delete venue.previewPhoto;
        }

        if (!venue.specials || !venue.specials.message ) {
            delete venue.specials;
        }

        venues.push(venue);
    }

    return venues;
};

exports.ConvertSchedule = function (data) {
  var schedule = [],
        i = 0;

    for (i; i < data.length; i++) {
        var checkin = {
            id : data[i]._id,
            venue : data[i].venueName,
            ll : data[i].ll,
            checkinDate : data[i].checkinDate,
            interval : data[i].interval,
            count : data[i].count,
            errors : data[i].error
        };

        schedule.unshift(checkin);
    }

    return schedule;
};