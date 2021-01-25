const fetch = require("node-fetch");



function getZomatoCityId(city){
   return fetch("https://developers.zomato.com/api/v2.1/cities?q="+
   city, {
     headers: {
        Accept: "application/json",
        "User-Key": "8afc96c75a3fbe2985c0d465fe2c3940"
    }
})
.then((response) => response.json())
.then((data) => {
    console.log(data.location_suggestions[0].id);
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
                    "user-key": "8afc96c75a3fbe2985c0d465fe2c3940",
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
    getZomatoCityId
};