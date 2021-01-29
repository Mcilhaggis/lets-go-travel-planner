const fetch = require("node-fetch");
require("dotenv").config();
// console.log(process.env);



function getZomatoCityId(city){
  return fetch("https://developers.zomato.com/api/v2.1/cities?q="+
   city, {

    headers: {
      Accept: "application/json",
      "User-Key": process.env.API_KEY

    }
  })
    .then((response) => response.json())
    .then((data) => {
    // console.log(data.location_suggestions[0].id);
      return data.location_suggestions[0].id;
    });
}


//Get Zomato restaurant by CityId
function getZomatoRestaurant(cityId) {
  return fetch(
    "https://developers.zomato.com/api/v2.1/search?entity_id=" +
            cityId +
            "&entity_type=city&start=1&count=30", {

      headers: {
        "user-key": process.env.API_KEY,
                
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}


//Get Restaurant Review
function getRestaurantReview(restaurantId){

  return fetch("https://developers.zomato.com/api/v2.1/reviews?res_id="+restaurantId, {
    headers: {
      Accept: "application/json",
      "User-Key": api_key
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
module.exports = {
  // getZomatoCity,
  getZomatoRestaurant,
  getZomatoCityId,
  getRestaurantReview
};