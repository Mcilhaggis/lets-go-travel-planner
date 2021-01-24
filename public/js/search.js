function getActivityResultAPI(city) {
  $.get("/api/activity", { city: city }).then((data) => {
    console.log(data);
  });
}
function getRestaurantAPI(city) {
  $.get("/api/restaurants", { city: city }).then((data) => {
    console.log(data);
  });
}
// When the form is submitted, we validate there's an email and password entered
// searchBtn.on("click", (e) => {
//   e.preventDefault();
//   const cityName = ca.val().trim();
//   console.log("I've been clicked");
//   console.log(cityName);

//   // If we have an email and password we run the loginUser function and clear the form
//   getRestaurantAPI('New York');
//   getActivityResultAPI('New York');

//   //Empty the search bar once search submitted
//   ca.val("");
// });

$("#create-form").submit((event) => {
    const cityName = ca.value.trim();
    console.log(cityName);
    // getRestaurantAPI("New York");
  // getActivityResultAPI("New York");
  alert("cool");

});
