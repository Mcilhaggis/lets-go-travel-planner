const fetch = require("node-fetch");



// //Get Zomato City detail
// function getZomatoCity() { 
//   fetch('https://developers.zomato.com/api/v2.1/cities?q='+cityParam, {
//     headers: {
//       'user-key': '8afc96c75a3fbe2985c0d465fe2c3940'
//     }
//   })
//   .then(response => response.json())
//   .then(data => console.log(data.location_suggestions) );
  
// }



//Get Zomato restaurant by CityId
function getZomatoRestaurant(city) { 
   return fetch('https://developers.zomato.com/api/v2.1/search?q='+city+'&start=1&count=3', {
    headers: {
      'user-key': '8afc96c75a3fbe2985c0d465fe2c3940'
    }
  })
  .then(response => response.json())
  .then(data => {
    // let restaurants = data.restaurants.map((o) => o.restaurant);
    // data.restaurants = restaurants;
    return data;
  });



  
}



module.exports = {
  // getZomatoCity, 
  getZomatoRestaurant
};


//---------------------If you need to call this function from another file--------------//
// require this file
const zomato = require("../controllers/zomato");

// testAPI!!!!!!!!!!!!!!!!!
  const cityParam = 'Winnipeg'
  
  // Call Api function from Class 'zomato'
  zomato.getZomatoRestaurant(cityParam).then(function(result) {
    result.restaurants.map((o) => console.log(o.restaurant.name)) 
 })
