//STORING ID OF RESPECTIVE ELEMENTS ON THE PAGE
let activityID;
let restaurantID;

// MAKING RESTAURANT MODAL ELEMENTS GLOBAL

const modalRestaurantName = document.getElementById("modalRestaurantName");
const modalRestaurantAddress = document.getElementById(
  "modalRestaurantAddress"
);
const modalRestaurantPhone = document.getElementById("modalRestaurantPhone");
const modalRestaurantWebsite = document.getElementById(
  "modalRestaurantWebsite"
);
const modalRestaurantPhoto = document.getElementById("modalRestaurantPhoto");
const modalSavedRestaurantComments = document.getElementById(
  "savedRestaurantComments"
);

// MAKING ACTIVITY MODAL ELEMENTS GLOBAL
const modalActivityName = document.getElementById("modalActivityName");
const modalActivityDescription = document.getElementById(
  "modalActivityDescription"
);
const modalActivityPhoto = document.getElementById("modalActivityPhoto");
const modalSavedActivityComments = document.getElementById(
  "savedActivityComments"
);

// Getting restaurant name to display in result div
const getRestaurantNames = () => {
  fetch("/api/itinerary/restaurant", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      //Organise the results grouped by city
      const destination = data.reduce((r, a) => {
        r[a.destination] = r[a.destination] || [];
        r[a.destination].push(a);
        return r;
      }, Object.create(null));
      //For each item, add the details
      for (const city in destination) {
        const destinationName = document.createElement("h4");
        destinationName.textContent = `${city}`;
        destinationName.className = "cityName";
        rNames.appendChild(destinationName);
        destination[city].forEach((item, i) => {

          const destination = item.destination;
          const id = item.id;
          const restaurantName = item.restaurantName;

          //Dynamically creating elements to store save restuarant results
          const rNames = document.getElementById("rNames");
          const rNameListItem = document.createElement("li");
          const viewItem = document.createElement("button");
          const deleteItem = document.createElement("button");

          //Adding attributes to created elements
          rNameListItem.setAttribute("destination", `${destination}`);
          rNameListItem.setAttribute("sql", `${id}`);
          rNameListItem.setAttribute("id", `restaurant-name-${i}`);
          rNameListItem.className = "my-3";
          viewItem.className =
            "restaurantModalView text-center btn btn-light btn-sm mx-2";
          deleteItem.className =
            "deleteRestaurant text-center btn btn-light btn-sm";
          viewItem.textContent = "View";
          deleteItem.textContent = "Delete";
          viewItem.setAttribute("data-id-target", `${item.id}`);
          deleteItem.setAttribute("data-id-target", `${item.id}`);
          rNameListItem.textContent = `${restaurantName}`;

          //Appending elements to the page
          rNames.appendChild(rNameListItem);
          rNameListItem.appendChild(viewItem);
          rNameListItem.appendChild(deleteItem);
        });
      }
    });
};

//Get all activity names to display on the results page
const getActivityNames = () => {
  // Getting activity name
  fetch("/api/itinerary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => {
      //Group results by destionations
      const destination = data.reduce((r, a) => {
        r[a.destination] = r[a.destination] || [];
        r[a.destination].push(a);
        return r;
      }, Object.create(null));
      for (const city in destination) {
        const destinationName = document.createElement("h4");
        destinationName.className = "cityName";
        destinationName.textContent = `${city}`;
        aNames.appendChild(destinationName);
        destination[city].forEach((item, i) => {
          const destination = item.destination;
          const id = item.id;
          const activityName = item.activityName;

          //Creating activity display elements dynamically
          const aNames = document.getElementById("aNames");
          const aNameListItem = document.createElement("li");
          const viewItem = document.createElement("button");
          const deleteActivity = document.createElement("button");

          //Assigning attributes to activity list elements
          aNameListItem.setAttribute("destination", `${destination}`);
          aNameListItem.setAttribute("sql", `${id}`);
          aNameListItem.setAttribute("id", `activity-name-${i}`);
          aNameListItem.className = "my-3";
          viewItem.className =
            "activityModalView text-center btn btn-light btn-sm mx-2";
          deleteActivity.className =
            "deleteActivity text-center btn btn-light btn-sm";
          viewItem.textContent = "View";
          deleteActivity.textContent = "Delete";
          viewItem.setAttribute("data-id-target", `${item.id}`);
          deleteActivity.setAttribute("data-id-target", `${item.id}`);
          aNameListItem.textContent = `${activityName}`;

          //Appending activity items to the page dynamically
          aNames.appendChild(aNameListItem);
          aNameListItem.appendChild(viewItem);
          aNameListItem.appendChild(deleteActivity);
        });
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

getRestaurantNames();
getActivityNames();

// Modal restaurant function
// Show the modal to the user when view button is clicked
$(document).on("click", ".restaurantModalView", e => {
  e.preventDefault();
  restaurantID = e.target.dataset.idTarget;

  fetch("/api/itinerary/restaurant", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(
        (
          {
            id,
            restaurantName,
            restaurantWebsite,
            restaurantAddress,
            restaurantPhone,
            restaurantPhoto,
            comments
          },
          i
        ) => {
          //Only display the infomration for the saved item that's clicked
          if (id == restaurantID) {
            modalRestaurantName.textContent = `${restaurantName}`;
            modalRestaurantAddress.textContent = `${restaurantAddress}`;
            modalRestaurantPhone.textContent = `${restaurantPhone}`;
            modalRestaurantWebsite.href = `${restaurantWebsite}`;
            modalRestaurantPhoto.src = `${restaurantPhoto}`;
            modalSavedRestaurantComments.textContent = `${comments}`;
          }
        }
      );
    })
    .catch(error => {
      console.error("Error:", error);
    });
  $("#myRestaurantModal").modal("show");
});

//Update the text area information stored in the database when clicked
$(document).on("click", ".updateRestaurant", event => {
  event.preventDefault();
  const modalRestaurantComment = document.getElementById(
    "modalRestaurantComment"
  ).value;

  // Clear the comment field and reload the page
  $("#modalRestaurantComment").val("");
  location.reload();

  fetch(`/api/itinerary/${restaurantID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comments: modalRestaurantComment })
  }).catch(err => console.error(err));
});

//Close the modal when user clicks on "close"
$(document).on("click", ".closeModal", event => {
  event.preventDefault();
  $("#myRestaurantModal").modal("hide");
});

// Modal activity function
// Show the modal to the user when view button is clicked
$(document).on("click", ".activityModalView", e => {
  e.preventDefault();
  activityID = e.target.dataset.idTarget;

  fetch("/api/itinerary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(
        (
          { id, activityName, activityPhoto, activityDescription, comments },
          i
        ) => {
          //Only display the inormation for the item clicked on to view from activities
          if (id == activityID) {
            modalActivityName.textContent = `${activityName}`;
            modalActivityDescription.textContent = `${activityDescription}`;
            modalActivityPhoto.src = `${activityPhoto}`;
            modalSavedActivityComments.textContent = `${comments}`;
          }
        }
      );
    })
    .catch(error => {
      console.error("Error:", error);
    });

  $("#myActivityModal").modal("show");
});

//Update the text area information stored in the database when clicked
$(document).on("click", ".updateActivity", event => {
  event.preventDefault();
  const modalActivityComment = document.getElementById("modalActivityComment")
    .value;

  // Clear the comment field and reload the page
  $("#modalActivityComment").val("");
  location.reload();

  fetch(`/api/itinerary/${activityID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comments: modalActivityComment })
  }).catch(err => console.error(err));
});

//Close the modal when user clicks on "close"
$(document).on("click", ".closeModal", event => {
  event.preventDefault();
  $("#myActivityModal").modal("hide");
});

// DELETE ROUTE
// RESTAURANT
$(document).on("click", ".deleteRestaurant", e => {
  e.preventDefault();
  const restaurantID = e.target.dataset.idTarget;
  fetch(`/api/itinerary/${restaurantID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(console.log("item deleted"));
  location.reload();
});

// DELETE ROUTE
// ACTIVITY
$(document).on("click", ".deleteActivity", e => {
  e.preventDefault();
  const activityID = e.target.dataset.idTarget;
  fetch(`/api/itinerary/${activityID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(console.log("item deleted"));
  location.reload();
});
