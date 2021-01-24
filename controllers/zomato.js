const fetch = require("node-fetch");

//Get Zomato restaurant by CityId
function getZomatoRestaurant(city) {
    return fetch(
            "https://developers.zomato.com/api/v2.1/search?q=" +
            city +
            "&start=1&count=3", {
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
};