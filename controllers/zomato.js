const fetch = require("node-fetch");



function getZomatoCityId(city){
   return fetch("https://developers.zomato.com/api/v2.1/cities?q="+
   city, {
     headers: {
        Accept: "application/json",
        // "User-Key": "8afc96c75a3fbe2985c0d465fe2c3940"
        "User-Key": "9414156c49c815976ed584073d2e31db"
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
            "&entity_type=city&start=1&count=3", {
                headers: {
                    // "user-key": "8afc96c75a3fbe2985c0d465fe2c3940",
                    "User-Key": "9414156c49c815976ed584073d2e31db"
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
    // "User-Key": "8afc96c75a3fbe2985c0d465fe2c3940"
    "User-Key": "9414156c49c815976ed584073d2e31db"
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