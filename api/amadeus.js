const { response } = require("express");
const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const app = express();

function getActivity(city) {
  return fetch(
    "https://developers.zomato.com/api/v2.1/locations?query=" + city,
    {
      headers: {
        "user-key": "8afc96c75a3fbe2985c0d465fe2c3940",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let latitude = data.location_suggestions.map((o) => o.latitude);
      let longitude = data.location_suggestions.map((o) => o.longitude);
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
    body:
      "grant_type=client_credentials&client_id=LPEc20EhzePh5QWWfhu1JSGIlVm5re4d&client_secret=oG7BvAKRNDtkwOVS",
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
      "&radius=1",
    {
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
