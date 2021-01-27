const express = require("express");
const router = express.Router();
const db = require("../models/");
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const passport = require("../config/passport");
// Requiring our models and passport as we've configured it
const zomato = require("../controllers/zomato");
const amadeus = require("../controllers/amadeus");
const { Op } = require("sequelize");


//HTML ROUTES
router.get("/", (req, res) => {
    // If the user already has an account send them to the search page
    if (req.user) {
        res.redirect("/search");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
});


router.get("/login", (req, res) => {
    // If the user already has an account send them to the search page
    if (req.user) {
        res.redirect("/search");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
});


// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/search", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/search.html"));
    res.render("search");
});


// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/result", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/result.html"));
    res.render("result");
});


//SIGNUP & LOGIN API ROUTES
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the search page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});


// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", (req, res) => {
    db.User.create({
            email: req.body.email,
            password: req.body.password,
        })
        .then(() => {
            res.redirect(307, "/api/login");
        })
        .catch((err) => {
            res.status(401).json(err);
        });
});


// Route for logging user out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id,
        });
    }
});


//ITINERARY API ROUTES
//Route for export
// GET route for getting all of the saved itenrary items
router.get("/api/itinerary/restaurant", (req, res) => {
    console.log(req.user.id);
    // findAll returns all entries for a table when used with no options
    db.Itinerary.findAll({
        attributes: ['id', 'restaurantName', 'restaurantWebsite', 'restaurantAddress', 'restaurantPhone', 'restaurantPhoto'],
        where: {
            [Op.and]: [
                { memberID: req.user.id },
                {
                    restaurantName: {
                        [Op.not]: ""
                    }
                }
            ]
        }
    }).then((result) => res.json(result));
});

router.get("/api/itinerary", (req, res) => {
    console.log(req.user.id);
    // findAll returns all entries for a table when used with no options
    db.Itinerary.findAll({
        attributes: ['id', 'activityName', 'activityPhoto', 'activityDescription', 'activityWebsite'],
        where: {
            [Op.and]: [
                { memberID: req.user.id },
                {
                    activityName: {
                        [Op.not]: ""
                    }
                }
            ]
        }
    }).then((result) => res.json(result));
});


// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
// POST route for saving a new itinerary item
router.post("/api/itinerary/restaurant", (req, res) => {
    console.log(req.body);
    // Create takes an argument of an object describing the item we want to
    // Insert into our table. We pass in an object with a text and complete property.

    //If the item is already in there with a matching restaurant name the item will not be created
    db.Itinerary.findOrCreate({
            where: {
                restaurantName: req.body.restaurantName
            },
            defaults: {
                memberId: req.user.id,
                destination: req.body.destination,
                restaurantWebsite: req.body.restaurantWebsite,
                restaurantName: req.body.restaurantName,
                restaurantAddress: req.body.restaurantAddress,
                restaurantPhone: req.body.restaurantPhone,
                restaurantPhoto: req.body.restaurantPhoto
            },
        })
        .then(async([result, created]) => {
            if (!created) {
                console.log("You added this already")
            }
        });

});

// POST route for saving a new itinerary item
router.post("/api/itinerary", (req, res) => {
    console.log(req.body);
    // Create takes an argument of an object describing the item we want to
    // Insert into our table. We pass in an object with a text and complete property.

    //If the item is already in there with a matching activities name the item will not be created
    db.Itinerary.findOrCreate({
            where: {
                activityName: req.body.activityName,
            },
            defaults: {
                memberId: req.user.id,
                destination: req.body.destination,
                activityName: req.body.activityName,
                activityPhoto: req.body.activityPhoto,
                activityDescription: req.body.activityDescription,
                activityWebsite: req.body.activityWebsite,
            },
        })
        .then(async([result, created]) => {
            if (!created) {
                console.log("You added this already")
            }
        });

});



// Deleting a previously saved restaurant
router.delete("/api/itinerary/:restaurantID", (req, res) => {
    console.log(req.params.restaurantID)
    // We just have to specify which itinerary item we want to destroy with "where"
    db.Itinerary.destroy({
        where: {
            id: req.params.restaurantID, // we get this value from a click on a button of the item it's attached to
        },
    }).then((result) => res.json(result));
});

// Deleting a previously saved activity
router.delete("/api/itinerary/:activityID", (req, res) => {
    console.log(req.params.activityID)
    // We just have to specify which itinerary item we want to destroy with "where"
    db.Itinerary.destroy({
        where: {
            id: req.params.activityID, // we get this value from a click on a button of the item it's attached to
        },
    }).then((result) => res.json(result));
});





const resId = [];
// Call Api function from Class 'zomato'
router.get("/api/restaurants", (req, res) => {
    let allRestaurnt = {}

    zomato.getZomatoCityId(req.query.city).then(function(cityId) {
        zomato.getZomatoRestaurant(cityId).then((result) => {
            allRestaurnt.restaurants = result.restaurants.map((o) =>
                (restaurant = {
                    name: o.restaurant.name,
                    url: o.restaurant.url,
                    address: o.restaurant.location.address,
                    menu: o.restaurant.menu_url,
                    phone: o.restaurant.phone_numbers,
                    photos: o.restaurant.featured_image,
                    res_id: o.restaurant.id
                }),
            );


            res.json(allRestaurnt);
            // // ==== PREPARED FOR HANDLE_BAR=====
            // res.render('search', {allRestaurnt});
        });


    });
});


// Call 'zomato' Restaurant Reviews
router.get("/api/restaurantReviews", (req, res) => {
    zomato.getRestaurantReview(req.query.res_id).then(function(data) {
        let onlyTwoData = data.user_reviews.slice(0, 2);
        // console.log(onlyTwoData);
        let allReviews = {
            reviews: onlyTwoData.map((o) =>
                (review = {
                    res_id: req.query.res_id,
                    review_text: o.review.review_text,
                    rating_text: o.review.rating_text[0]

                }),
            ),
        };

        res.json(allReviews);
    });
});


// Get Activities from Amadeus API
router.get("/api/activity", (req, res) => {
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
                        }),
                    ]),
                };

                res.send(allActivities);

                // // ==== PREPARED FOR HANDLEBARS=====
                // res.render('result', {allActivities});
            });
        });
    });
});
// Export routes for server.js to use.
module.exports = router;