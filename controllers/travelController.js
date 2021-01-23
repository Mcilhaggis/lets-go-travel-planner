const express = require("express");

const router = express.Router();

const db = require("../models/");

const path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated");

const passport = require("../config/passport");

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
  res.sendFile(path.join(__dirname, "../public/result.html"));
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

//ITINERARY API ROUTES - to be included

// Export routes for server.js to use.
module.exports = router;
