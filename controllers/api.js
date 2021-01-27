// Requiring our models and passport as we've configured it
const zomato = require("../controllers/zomato");
const amadeus = require("../controllers/amadeus");

module.exports = function(app) {
    // Get Activities from Amadeus API
    app.get("/api/activity", (req, res) => {
        //Get geo-location
        amadeus.getActivity(req.query.city).then(function(geocode) {
            // Get amadeus token
            amadeus.getTokenActivities().then(function(token) {
                // Get amadeus Activities
                amadeus.getActivityResult(token, geocode).then(function(activities) {
                    let act = activities.data.slice(0, 3);
                    // console.log(act);
                    let allActivities = {
                        activities: act.map((o) => [
                            (Activity = {
                                name: o.name,
                                description: o.shortDescription,
                                rating: o.rating,
                                price: o.price.amount,
                                photo: o.pictures[0],
                                url: o.bookingLink
                            }),
                        ]),
                    };
                    console.log(url)
                    console.log(allActivities);
                    //For Testing
                    res.send(allActivities);

                    // // ==== PREPARED FOR HANDLEBARS=====
                    // res.render('result', {allActivities});
                });
            });
        });
    });

    // Call Api function from Class 'zomato'
    app.get("/api/restaurants", (req, res) => {
        zomato.getZomatoRestaurant(req.query.city).then(function(result) {
            // console.log(result);
            let allRestaurnt = {
                restaurants: result.restaurants.map((o) => [
                    (restaurant = {
                        name: o.restaurant.name,
                        url: o.restaurant.url,
                        address: o.restaurant.location.address,
                        rating: o.restaurant.all_reviews.rating,
                        menu: o.restaurant.menu_url,
                        phone: o.restaurant.phone_numbers,
                        photos: o.restaurant.photos_url,
                    }),
                ]),
            };

            // ==== TESTING ON result.js ====
            res.send(allRestaurnt);

            // // ==== PREPARED FOR HANDLE_BAR=====
            // res.render('result', {allRestaurnt});
        });
    });
};