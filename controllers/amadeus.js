
require("dotenv").config();
const fetch = require("node-fetch");



function getActivity(city) {
  return fetch(
    "https://developers.zomato.com/api/v2.1/locations?query=" + city, {
      headers: {
        "User-Key": process.env.API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.location_suggestions.map((o) => o.latitude);
      const longitude = data.location_suggestions.map((o) => o.longitude);
      const geocode = [].concat(latitude, longitude);

      return geocode;
    });
}

function getTokenActivities() {
  return fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&client_id=LPEc20EhzePh5QWWfhu1JSGIlVm5re4d&client_secret=oG7BvAKRNDtkwOVS",
  })
    .then((response) => response.json())
    .then((data) => {
      return data.access_token;
    });
}

function getActivityResult(amadeusToken, geocode) {
  return fetch(
    "https://test.api.amadeus.com/v1/shopping/activities?latitude=" +
    geocode[0] +
    "&longitude=" +
    geocode[1] +
    "&radius=1", {
      headers: {
        Authorization: "Bearer " + amadeusToken,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

module.exports = {
  getActivity,
  getTokenActivities,
  getActivityResult,
};