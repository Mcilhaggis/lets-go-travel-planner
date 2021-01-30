$(document).ready(() => {
  const restaurantsResults = document.getElementById("restaurantsResults");
  const activitiesResults = document.getElementById("activitiesResults");

  // Api request to recieve activity data
  function getActivityResultAPI(city) {
    $.get("/api/activity", { city: city }).then((data) => {
      console.log(data);
      const activityColumnName = document.createElement("h2");
      activityColumnName.textContent = "Activities";
      activityColumnName.className = "colName";
      activitiesResults.appendChild(activityColumnName);


      for (let i = 0; i < data.activities.length; i++) {
        // view activity name
        const activitiesName = document.createElement("h5");
        activitiesName.setAttribute("id", `activity-${i}`);
        activitiesResults.appendChild(activitiesName);
        activitiesName.textContent = data.activities[i][0].name;

        // view activity photo
        const activitiesImage = document.createElement("img");
        activitiesImage.setAttribute("id", `activity-image-${i}`);
        activitiesImage.src = data.activities[i][0].photo;
        activitiesResults.appendChild(activitiesImage);
        activitiesImage.style.height = "auto";
        activitiesImage.style.width = "200px";
        activitiesImage.style.float = "left";

        //view activity description
        const activitiesDescription = document.createElement("p");
        activitiesDescription.setAttribute("id", `activity-description-${i}`);
        activitiesDescription.className = "text";
        activitiesDescription.textContent = data.activities[i][0].description;
        activitiesImage.style.margin = "15px"; //?????
        activitiesResults.appendChild(activitiesDescription);

        //view URL for activity  - NEEDS URL FROM API ADDED
        const activitySite = document.createElement("a");
        activitySite.href = data.activities[i][0].website;
        activitySite.setAttribute("id", `activity-website-${i}`);
        activitySite.textContent = "Book Now";
        activitySite.className = "mb-5 d-inline-block";
        activitySite.target = "_blank";
        activitiesResults.appendChild(activitySite);

        //save button to connect to database
        const activitySaveBtn = document.createElement("button");
        activitySaveBtn.className = "aSave save btn btn-light btn-sm";
        activitySaveBtn.setAttribute("data-id-target", `${i}`);
        activitySaveBtn.innerHTML = "Save";
        activitySite.appendChild(activitySaveBtn);

        //horizontal rule to seperate results
        const hr = document.createElement("hr");
        activitiesResults.appendChild(hr);
      }
    });
  }

  // Api request to recieve restaurant data
  function getRestaurantAPI(city) {
    $.get("/api/restaurants", { city: city }).then((data) => {
      console.log(data);
      //Adding name to column once search is submitted
      const restaurantColumnName = document.createElement("h2");
      restaurantColumnName.textContent = "Restaurants";
      restaurantColumnName.className = "colName";
      restaurantsResults.appendChild(restaurantColumnName);

      for (let i = 0; i < data.restaurants.length; i++) {
        // view restaurant name
        const restaurantsName = document.createElement("h5");
        restaurantsName.setAttribute("id", `restaurant-${i}`);
        restaurantsResults.appendChild(restaurantsName);
        restaurantsName.textContent = data.restaurants[i].name;

        // clickable link to take user to zomato restaurant photos page
        const restaurantsImage = document.createElement("img");
        restaurantsImage.setAttribute("id", `restaurant-photo-${i}`);
        // const linkText = document.createTextNode("view photos");
        // restaurantsImage.appendChild(linkText);
        // restaurantsImage.title = "my title text";
        restaurantsImage.src = data.restaurants[i].photos;
        restaurantsResults.appendChild(restaurantsImage);
        // restaurantsImage.target = "_blank";
        restaurantsImage.style.height = "auto";
        restaurantsImage.style.width = "200px";
        restaurantsImage.style.float = "left";
        restaurantsImage.style.marginRight = "15px";
        restaurantsImage.className = "img-fluid";

        //view review for restuarant
        // const restaurantReview = document.createElement('p');
        // restaurantReview.textContent = data.restaurant[i][0].reviews[0];
        // restaurantsResults.appendChild(restaurantReview);

        //view address for restuarant
        const restaurantAddress = document.createElement("p");
        restaurantAddress.setAttribute("id", `restaurant-address-${i}`);
        restaurantAddress.textContent =
          "Address: " + data.restaurants[i].address;
        restaurantsImage.style.margin = "15px";
        restaurantsResults.appendChild(restaurantAddress);

        //view phone number for restuarant
        const restaurantPhone = document.createElement("p");
        restaurantPhone.setAttribute("id", `restaurant-phone-${i}`);
        restaurantPhone.textContent = "Phone: " + data.restaurants[i].phone;
        restaurantsResults.appendChild(restaurantPhone);

        //view URL for restuarant
        const restaurantSite = document.createElement("a");
        restaurantSite.setAttribute("id", `restaurant-website-${i}`);
        restaurantSite.href = data.restaurants[i].url;
        restaurantSite.textContent = "Visit Website";
        restaurantSite.className = "mb-5 d-inline-block";
        restaurantSite.target = "_blank";
        restaurantsResults.appendChild(restaurantSite);

        // Get Restaurant Reviews
        // getRestaurantReviewAPI(data.restaurants[i].res_id);

        // Save button that links to the database
        const restaurantSaveBtn = document.createElement("button");
        restaurantSaveBtn.className = "rSave save btn btn-light btn-sm";
        restaurantSaveBtn.setAttribute("data-id-target", `${i}`);
        restaurantSaveBtn.innerHTML = "Save";
        // restaurantsResults.appendChild(restaurantSaveBtn);
        restaurantSite.appendChild(restaurantSaveBtn);

        //horizontal rule to seperate results
        const hr = document.createElement("hr");
        restaurantsResults.appendChild(hr);
      }
    });
  }

  // Restaurant reviews api call
  function getRestaurantReviewAPI(res_id) {
    $.ajax({
      url: "/api/restaurantReviews",
      type: "get",
      async: false,
      data: { res_id: res_id },
      success: function(reviewsResult) {
        for (let i = 0; i < reviewsResult.reviews.length; i++) {
          console.log(reviewsResult);
          // Display Rating Text
          const restaurantRatingText = document.createElement("p");
          restaurantRatingText.textContent =
            "Rating Text: " + reviewsResult.reviews[i].rating_text;
          restaurantsResults.appendChild(restaurantRatingText);

          // Display Reviews
          const restaurantReview = document.createElement("p");
          restaurantReview.id = "rReview" + i;
          restaurantReview.textContent =
            "Review: " + reviewsResult.reviews[i].review_text;
          restaurantsResults.appendChild(restaurantReview);
        }
      },
    });
  }

  // Set global variable to be able to store the city name for database use
  let cityName;

  $("#create-form").on("submit", (event) => {
    event.preventDefault();
    cityName = ca.value.trim();
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    console.log(ca.value.trim());
    getRestaurantAPI(cityName);
    getActivityResultAPI(cityName);
    $("#ca").val("");
    activitiesResults.innerHTML = "";
    restaurantsResults.innerHTML = "";
  
  });

  // Click function to grab the rendered restaurant data
  $(document).on("click", ".rSave", (event) => {
    event.preventDefault();
    const restaurantName = document.querySelector(
      `#restaurant-${event.target.dataset.idTarget}`
    ).textContent;
    const restaurantAddress = document.querySelector(
      `#restaurant-address-${event.target.dataset.idTarget}`
    ).textContent;
    const restaurantPhone = document.querySelector(
      `#restaurant-phone-${event.target.dataset.idTarget}`
    ).textContent;
    const restaurantWebsite = document.querySelector(
      `#restaurant-website-${event.target.dataset.idTarget}`
    ).href;
    const restaurantPhoto = document.querySelector(
      `#restaurant-photo-${event.target.dataset.idTarget}`
    ).src;

    const itineraryData = {
      destination: cityName,
      restaurantName: restaurantName,
      restaurantAddress: restaurantAddress,
      restaurantPhone: restaurantPhone,
      restaurantWebsite: restaurantWebsite,
      restaurantPhoto: restaurantPhoto,
    };
    console.log(itineraryData);
    fetch("/api/itinerary/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryData),
    });
  });

  // // Click function to grab the rendered activity data
  $(document).on("click", ".aSave", (event) => {
    event.preventDefault();
    console.log("aSave being clicked");
    const activityName = document.querySelector(
      `#activity-${event.target.dataset.idTarget}`
    ).textContent;
    const activityPhoto = document.querySelector(
      `#activity-image-${event.target.dataset.idTarget}`
    ).src;
    const activityDescription = document.querySelector(
      `#activity-description-${event.target.dataset.idTarget}`
    ).textContent;
    const activityWebsite = document.querySelector(
      `#activity-website-${event.target.dataset.idTarget}`
    ).href;

    const itineraryData = {
      destination: cityName,
      activityName: activityName,
      activityPhoto: activityPhoto,
      activityDescription: activityDescription,
      activityWebsite: activityWebsite,
    };
    console.log(itineraryData);
    fetch("/api/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryData),
    });
  });
});
