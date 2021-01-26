$(document).ready(() => {

  const restaurantsResults = document.getElementById("restaurantsResults");
  const activitiesResults = document.getElementById("activitiesResults");

  // let test = getUserData();
  // setTimeout(console.log(test), 1000)
  // console.log(test)

  // getUserData();

  // function getUserData() {
  //     let userId;
  //     $.get("/api/user_data").then((data) => {
  //         console.log(data)
  //         userId = data.id;
  //         console.log(userId)

  //     })
  //     return userId
  // };
  // async await
  // pass id through url if we cannot figure this out
  // parse url and take off id, set to variable and use that

  function getActivityResultAPI(city) {
      $.get("/api/activity", { city: city }).then((data) => {
          console.log(data);
          for (let i = 0; i < data.activities.length; i++) {
              // view activity name
              const activitiesName = document.createElement("h2");
              activitiesResults.appendChild(activitiesName);
              activitiesName.textContent = data.activities[i][0].name;

              // view activity photo
              const activitiesImage = document.createElement('img');
              activitiesImage.src = data.activities[i][0].photo;
              activitiesResults.appendChild(activitiesImage);
              activitiesImage.style.height = "auto";
              activitiesImage.style.width = "200px"; 
              activitiesImage.style.float = "left";

              //view activity description
              const activitiesDescription = document.createElement('p');
              activitiesDescription.textContent = data.activities[i][0].description;
              activitiesImage.style.margin = "15px";
              activitiesResults.appendChild(activitiesDescription);

              //view URL for activity  - NEEDS URL FROM API ADDED
              const activitySite = document.createElement('a');
              activitySite.href = data.activities[i][0].website;
              activitySite.textContent = data.activities[i][0].name + " website";
              activitySite.target = "_blank"
              activitiesResults.appendChild(activitySite);

              //save button to connect to database
              const activitySaveBtn = document.createElement('button');
              activitySaveBtn.id = "aSave";
              activitySaveBtn.className = "save btn btn-primary";
              activitySaveBtn.innerHTML = "SAVE";
              activitiesResults.appendChild(activitySaveBtn);


              //horizontal rule to seperate results
              const hr = document.createElement('hr')
              activitiesResults.appendChild(hr)
          }
      });
  }

  function getRestaurantAPI(city) {
      $.get("/api/restaurants", { city: city }).then((data) => {
          console.log(data);
          for (let i = 0; i < data.restaurants.length; i++) {
              // view restaurant name
              const restaurantsName = document.createElement("h2");
              restaurantsName.id = "rName";
              restaurantsResults.appendChild(restaurantsName);
              restaurantsName.textContent = data.restaurants[i].name;

              // clickable link to take user to zomato restaurant photos page
              const restaurantsImage = document.createElement('img');
              const linkText = document.createTextNode("view photos");
              restaurantsImage.appendChild(linkText);
              restaurantsImage.title = "my title text";
              restaurantsImage.src = data.restaurants[i].photos;
              restaurantsImage.target = "_blank";
              restaurantsImage.style.height = "auto";
              restaurantsImage.style.width = "200px";
              restaurantsImage.style.float = "left";
              restaurantsImage.style.marginRight = "15px";


              document.getElementById("restaurantsResults").appendChild(restaurantsImage);

              //view review for restuarant
              // const restaurantReview = document.createElement('p');
              // restaurantReview.textContent = data.restaurant[i][0].reviews[0];
              // restaurantsResults.appendChild(restaurantReview);

              //view address for restuarant  
              const restaurantAddress = document.createElement('p');
              restaurantAddress.textContent = "Address: " + data.restaurants[i].address;
              restaurantsResults.appendChild(restaurantAddress);

              //view phone number for restuarant  
              const restaurantPhone = document.createElement('p');
              restaurantPhone.textContent = "Phone: " + data.restaurants[i].phone;
              restaurantsResults.appendChild(restaurantPhone);

              //view URL for restuarant  
              const restaurantSite = document.createElement('a');
              restaurantSite.href = data.restaurants[i].url;
              restaurantSite.textContent = data.restaurants[i].name + " website";
              restaurantSite.target = "_blank"
              restaurantsResults.appendChild(restaurantSite);


              // Get Restaurant Reviews
              getRestaurantReviewAPI(data.restaurants[i].res_id);


              // Save button that links to the database
              const restaurantSaveBtn = document.createElement('button');
              restaurantSaveBtn.id = "rSave";
              restaurantSaveBtn.className = "save btn btn-primary";
              restaurantSaveBtn.innerHTML = "SAVE";
              restaurantsResults.appendChild(restaurantSaveBtn);

      
              

              //horizontal rule to seperate results
              const hr = document.createElement('hr');
              restaurantsResults.appendChild(hr);


          }
      });
  }


  function getRestaurantReviewAPI(res_id){
    $.ajax({
      url : "/api/restaurantReviews",
      type : "get",
      async: false,
      data:{res_id: res_id},
      success : function(reviewsResult) {
         
         for(let i=0; i<reviewsResult.reviews.length;i++){
          console.log(reviewsResult);
          // Display Rating Text
          const restaurantRatingText = document.createElement("p");
          restaurantRatingText.textContent = "Rating Text: " + reviewsResult.reviews[i].rating_text;
          restaurantsResults.appendChild(restaurantRatingText);

          // Display Reviews 
          const restaurantReview = document.createElement("p");
          restaurantReview.id = "rReview"+i;
          restaurantReview.textContent = "Review: " + reviewsResult.reviews[i].review_text;
          restaurantsResults.appendChild(restaurantReview);
        }
      }});
  };

  $("#create-form").on("submit", event => {
      event.preventDefault();
      const cityName = ca.value.trim();
      console.log(ca.value.trim());
      getRestaurantAPI(cityName);
      getActivityResultAPI(cityName);
      $("#ca").val('');
      activitiesResults.innerHTML = '';
      restaurantsResults.innerHTML = '';

  });

  $("rSave").on("submit", event => {
      event.preventDefault();
      const itineraryData = {
          restaurantName: document.getElementById('rName').value.trim(),
      }

      fetch('/api/itinerary', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(itineraryData),
      })
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
