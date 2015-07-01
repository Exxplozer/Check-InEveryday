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
                contact : {
                    phone: data.groups[0].items[i].venue.contact.phone ?
                       data.groups[0].items[i].venue.contact.phone : null,
                    formattedPhone: data.groups[0].items[i].venue.contact.formattedPhone ?
                        data.groups[0].items[i].venue.contact.formattedPhone : null


                },
                location: {
                    address : data.groups[0].items[i].venue.location.address,
                    crossStreet : data.groups[0].items[i].venue.location.crossStreet,
                    distance : data.groups[0].items[i].venue.location.distance,
                    postalCode : data.groups[0].items[i].venue.location.postalCode,
                    cc : data.groups[0].items[i].venue.location.cc,
                    neighborhood : data.groups[0].items[i].venue.location.neighborhood,
                    state : data.groups[0].items[i].venue.location.state,
                    formattedAddress : data.groups[0].items[i].venue.location.formattedAddress,
                    lat: data.groups[0].items[i].venue.location.lat,
                    lng: data.groups[0].items[i].venue.location.lng,
                    city: data.groups[0].items[i].venue.location.city,
                    country: data.groups[0].items[i].venue.location.country

                },
                categories: {
                    shortName: data.groups[0].items[i].venue.categories[0].shortName
                },
                verified :  data.groups[0].items[i].venue.verified,
                url : data.groups[0].items[i].venue.url,
                price : {
                    tier : data.groups[0].items[i].venue.price.tier ?
                        data.groups[0].items[i].venue.price.tier : null,
                    message : data.groups[0].items[i].venue.price.message ?
                        data.groups[0].items[i].venue.price.message : null,
                    currency : data.groups[0].items[i].venue.price.currency ?
                        data.groups[0].items[i].venue.price.currency : null
                },
                hasMenu : data.groups[0].items[i].venue.hasMenu,
                like : data.groups[0].items[i].venue.like,
                rating : data.groups[0].items[i].venue.rating,
                ratingColor : data.groups[0].items[i].venue.ratingColor,
                ratingSignals : data.groups[0].items[i].venue.ratingSignals,
                hours : {
                    status : data.groups[0].items[i].venue.status,
                    isOpen : data.groups[0].items[i].venue.isOpen,
                },
                previewPhoto: data.groups[0].items[i].venue.photos.groups[0] ? {
                    prefix: data.groups[0].items[i].venue.photos.groups[0].items[0].prefix,
                    suffix: data.groups[0].items[i].venue.photos.groups[0].items[0].suffix,
                    width: data.groups[0].items[i].venue.photos.groups[0].items[0].width,
                    height: data.groups[0].items[i].venue.photos.groups[0].items[0].height
                } : null,
                rating: data.groups[0].items[i].venue.rating,
                ratingColor: data.groups[0].items[i].venue.ratingColor
            };

            if (!restaurant.previewPhoto) {
                delete restaurant.previewPhoto;
            }

            restaurants.push(restaurant);

    }

    return restaurants;
};