$(document).ready(() => {

  const restaurantsResults = document.getElementById("restaurantsResults");
  const activitiesResults = document.getElementById("activitiesResults");

  function getActivityResultAPI(city) {
    $.get("/api/activity", { city: city }).then((data) => {
      console.log(data);
      for (let i = 0; i < data.activities.length; i++) {
        const activitiesName = document.createElement ("h2");
        activitiesResults.appendChild(activitiesName);
        activitiesName.textContent = data.activities[i][0].name;
        }
      //put data into your page;
    });
  }

  function getRestaurantAPI(city) {
    $.get("/api/restaurants", { city: city }).then((data) => {
      console.log(data);
      for (let i = 0; i < data.restaurants.length; i++) {
      const restaurantsName = document.createElement ("h1");
      restaurantsResults.appendChild(restaurantsName);
      restaurantsName.textContent = data.restaurants[i][0].name;
      }
      for (let i = 0; i < data.restaurants.length; i++) {
        const restaurantsAdress = document.createElement ("h1");
        restaurantsResults.appendChild(restaurantsAdress);
        restaurantsAdress.textContent = data.restaurants[i][0].address;
        }
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
