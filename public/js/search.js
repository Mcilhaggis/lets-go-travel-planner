$(document).ready(() => {
  function getActivityResultAPI(city) {
    $.get("/api/activity", { city: city }).then((data) => {
      console.log(data);
      //put data into your page;
    });
  }

  function getRestaurantAPI(city) {
    $.get("/api/restaurants", { city: city }).then((data) => {
      console.log(data);
      //put data into your page;
    });
  }

  // const testName = "New York"
  //   getRestaurantAPI(testName);
  //   getActivityResultAPI(testName);

  $("#create-form").on("submit", event => {
    event.preventDefault();
    const cityName = ca.value.trim();
    console.log(ca.value.trim());
    console.log("aaaaaa");
    getRestaurantAPI(cityName);
    getActivityResultAPI(cityName);
  });

  // // When the form is submitted, we validate there's an email and password entered
  // searchBtn.on("click", (e) => {
  //   e.preventDefault();
  //   const cityName = ca.val().trim();
  //   console.log("I've been clicked");
  //   console.log(cityName);

  // //   // If we have an email and password we run the loginUser function and clear the form
  // //   getRestaurantAPI('New York');
  // //   getActivityResultAPI('New York');

  // //   //Empty the search bar once search submitted
  // //   ca.val("");
  // // });
});
