// require itinerary model
const db = require("../models"); //this may require the full path name to itinerary

//Route for export
module.exports = app => {
  // GET route for getting all of the saved itenrary items
  app.get("/api/itinerary", (req, res) => {
    // findAll returns all entries for a table when used with no options
    db.Itinerary.findAll({
      where: {
        memberID: "test" // not test but equal to the users ID from login
      }
    }).then(result => res.json(result));
  });

  // POST route for saving a new itinerary item
  app.post("/api/itinerary", (req, res) => {
    console.log(req.body);
    // Create takes an argument of an object describing the item we want to
    // Insert into our table. We pass in an object with a text and complete property.
    db.Itinerary.create({
      memberId: "test", //this may come from a different place than the rest - referring to the user that is currently logged in
      activityId: "test",
      activityName: "test",
      restaurantName: "test",
      resturantURL: "test",
      restaurantLocation: "test",
      menuURL: "test",
      userRating: "test",
      restaurantPhoto: "test",
      restaurantRating: "test"
    }).then(result => res.json(result)); // result may not be the right name for
  });
};
// Deleting a previously saved item
app.delete("/api/itinerary/:activityId", (req, res) => {
  // We just have to specify which itinerary item we want to destroy with "where"
  db.Itinerary.destroy({
    where: {
      id: req.params.activityId // we get this value from a click on a button of the item it's attached to
    }
  }).then(result => res.json(result));
});
