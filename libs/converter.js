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
            rating : data.groups[0].items[i].venue.rating,
            ratingColor : data.groups[0].items[i].venue.ratingColor
        };

        if (!venue.previewPhoto) {
            delete venue.previewPhoto;
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

exports.ConvertRestaurants = function (data) {
    var restaurants = [],
        i  = 0;

    for (i; i < data.groups[0].items.length; i++) {

            var restaurant = {
                id: data.groups[0].items[i].venue.id,
                name: data.groups[0].items[i].venue.name,
                contact : data.groups[0].items[i].venue.contact,
                location : data.groups[0].items[i].venue.location,
                categories :  data.groups[0].items[i].venue.categories,
                verified :  data.groups[0].items[i].venue.verified,
                url : data.groups[0].items[i].venue.url,
                price : data.groups[0].items[i].venue.price,
                hasMenu : data.groups[0].items[i].venue.hasMenu,
                like : data.groups[0].items[i].venue.like,
                rating : data.groups[0].items[i].venue.rating,
                ratingColor : data.groups[0].items[i].venue.ratingColor,
                ratingSignals : data.groups[0].items[i].venue.ratingSignals,
                specials : data.groups[0].items[i].venue.specials,
                rating: data.groups[0].items[i].venue.rating,
                ratingColor: data.groups[0].items[i].venue.ratingColor
            };

            restaurants.push(restaurant);

    }

    return restaurants;
};

exports.ConvertSpecials = function (data) {
    var venues = [],
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
            menu : data.groups[0].items[i].venue.menu,
            specials : data.groups[0].items[i].venue.specials,
            categories : {
                shortName :  data.groups[0].items[i].venue.categories[0].shortName
            },
            previewPhoto : data.groups[0].items[i].venue.photos.groups[0] ? {
                prefix : data.groups[0].items[i].venue.photos.groups[0].items[0].prefix,
                suffix : data.groups[0].items[i].venue.photos.groups[0].items[0].suffix,
                width  : data.groups[0].items[i].venue.photos.groups[0].items[0].width,
                height : data.groups[0].items[i].venue.photos.groups[0].items[0].height
            } : null,
            rating : data.groups[0].items[i].venue.rating,
            ratingColor : data.groups[0].items[i].venue.ratingColor
        };

        if (!venue.previewPhoto) {
            delete venue.previewPhoto;
        }

        venues.push(venue);
    }

    return venues;
};