$(document).ready(() => {
    const restaurantsResults = document.getElementById("restaurantsResults");
    const activitiesResults = document.getElementById("activitiesResults");

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
                restaurantsName.className = "rName";
                restaurantsName.setAttribute('id', `restaurant-${i}`)
                restaurantsResults.appendChild(restaurantsName);
                restaurantsName.textContent = data.restaurants[i].name;

                // clickable link to take user to zomato restaurant photos page
                const restaurantsImage = document.createElement('img');
                restaurantsImage.setAttribute('id', `restaurant-photo-${i}`)
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
                restaurantAddress.setAttribute('id', `restaurant-address-${i}`)
                restaurantAddress.textContent = "Address: " + data.restaurants[i].address;
                restaurantsResults.appendChild(restaurantAddress);

                //view phone number for restuarant  
                const restaurantPhone = document.createElement('p');
                restaurantPhone.setAttribute('id', `restaurant-phone-${i}`)
                restaurantPhone.textContent = "Phone: " + data.restaurants[i].phone;
                restaurantsResults.appendChild(restaurantPhone);

                //view URL for restuarant  
                const restaurantSite = document.createElement('a');
                restaurantSite.setAttribute('id', `restaurant-website-${i}`)
                restaurantSite.href = data.restaurants[i].url;
                restaurantSite.textContent = data.restaurants[i].name + " website";
                restaurantSite.target = "_blank"
                restaurantsResults.appendChild(restaurantSite);


                // Get Restaurant Reviews
                // getRestaurantReviewAPI(data.restaurants[i].res_id);


                // Save button that links to the database
                const restaurantSaveBtn = document.createElement('button');
                restaurantSaveBtn.className = "rSave save btn btn-primary";
                restaurantSaveBtn.setAttribute('data-id-target', `${i}`)
                restaurantSaveBtn.innerHTML = "SAVE";
                restaurantsResults.appendChild(restaurantSaveBtn);




                //horizontal rule to seperate results
                const hr = document.createElement('hr');
                restaurantsResults.appendChild(hr);


            }
        });
    }


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
                    restaurantRatingText.textContent = "Rating Text: " + reviewsResult.reviews[i].rating_text;
                    restaurantsResults.appendChild(restaurantRatingText);

                    // Display Reviews 
                    const restaurantReview = document.createElement("p");
                    restaurantReview.id = "rReview" + i;
                    restaurantReview.textContent = "Review: " + reviewsResult.reviews[i].review_text;
                    restaurantsResults.appendChild(restaurantReview);
                }
            }
        });
    };

    let cityName;

    $("#create-form").on("submit", event => {
        event.preventDefault();
        cityName = ca.value.trim();
        console.log(ca.value.trim());
        getRestaurantAPI(cityName);
        getActivityResultAPI(cityName);
        $("#ca").val('');
        activitiesResults.innerHTML = '';
        restaurantsResults.innerHTML = '';

    });

    $(document).on("click", ".rSave", event => {
        event.preventDefault();
        var restaurantName = document.querySelector(`#restaurant-${event.target.dataset.idTarget}`).textContent
        var restaurantAddress = document.querySelector(`#restaurant-address-${event.target.dataset.idTarget}`).textContent
        var restaurantPhone = document.querySelector(`#restaurant-phone-${event.target.dataset.idTarget}`).textContent
        var restaurantWebsite = document.querySelector(`#restaurant-website-${event.target.dataset.idTarget}`).href
        var restaurantPhoto = document.querySelector(`#restaurant-photo-${event.target.dataset.idTarget}`).src
        console.log(restaurantName)
        const itineraryData = {
            destination: cityName,
            restaurantName: restaurantName,
            restaurantAddress: restaurantAddress,
            restaurantPhone: restaurantPhone,
            restaurantWebsite: restaurantWebsite,
            restaurantPhoto: restaurantPhoto
        }
        console.log(itineraryData)
        fetch('/api/itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itineraryData),
        })
    });
});