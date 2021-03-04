const fetch = require("node-fetch");
require("dotenv").config();

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

module.exports = {
  // getZomatoCity,
  getZomatoRestaurant,
  getZomatoCityId,
};