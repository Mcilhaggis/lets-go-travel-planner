// Getting restaurant name
const getRestaurantNames = () => {
  fetch("/api/itinerary/restaurant", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log('Success in getting all restaurant names:', data);
      data.forEach(({ id, restaurantName }, i) => {
        //Dynamically creating elements to store save dratuarant results
        const rNames = document.getElementById("rNames");
        const rNameListItem = document.createElement("li");
        const viewItem = document.createElement("button");
        const deleteItem = document.createElement("button");

        //Adding attributes to created elements
        rNameListItem.setAttribute("sql", `${id}`);
        rNameListItem.setAttribute("id", `restaurant-name-${i}`);
        rNameListItem.className = "my-3";
        viewItem.className =
          "restaurantModalView text-center btn btn-primary btn-sm mx-2";
        deleteItem.className =
          "deleteRestaurant text-center btn btn-primary btn-sm";
        viewItem.textContent = "View";
        deleteItem.textContent = "Delete";
        viewItem.setAttribute("data-id-target", `${i}`);
        deleteItem.setAttribute("data-id-target", `${i}`);
        rNameListItem.textContent = `${restaurantName}`;

        //Appending elements to the page
        rNames.appendChild(rNameListItem);
        rNameListItem.appendChild(viewItem);
        rNameListItem.appendChild(deleteItem);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

const getActivityNames = () => {
  // Getting activity name
  fetch("/api/itinerary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log('Success in getting all activity names:', data);
      data.forEach(({ id, activityName }, i) => {
        //Creating activity display elements dynamically
        const aNames = document.getElementById("aNames");
        const aNameListItem = document.createElement("li");
        const viewItem = document.createElement("button");
        const deleteActivity = document.createElement("button");

        //Assigning attributes to activity list elements
        aNameListItem.setAttribute("sql", `${id}`);
        aNameListItem.setAttribute("id", `activity-name-${i}`);
        aNameListItem.className = "my-3";
        viewItem.className =
          "activityModalView text-center btn btn-primary btn-sm mx-2";
        deleteActivity.className =
          "deleteActivity text-center btn btn-primary btn-sm";
        viewItem.textContent = "View";
        deleteActivity.textContent = "Delete";
        viewItem.setAttribute("data-id-target", `${i}`);
        deleteActivity.setAttribute("data-id-target", `${i}`);
        aNameListItem.textContent = `${activityName}`;

        //Appending activity items to the page dynamically
        aNames.appendChild(aNameListItem);
        aNameListItem.appendChild(viewItem);
        aNameListItem.appendChild(deleteActivity);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

getRestaurantNames();
getActivityNames();

//STORING ID OF RESPECTIVE ELEMENTS ON THE PAGE
let activityID;
let restaurantID;

// MAKING RESTAURANT MODAL ELEMENTS GLOBAL

const modalRestaurantName = document.getElementById('modalRestaurantName');
const modalRestaurantAddress = document.getElementById('modalRestaurantAddress');
const modalRestaurantPhone = document.getElementById('modalRestaurantPhone');
const modalRestaurantWebsite = document.getElementById('modalRestaurantWebsite');
const modalRestaurantPhoto = document.getElementById('modalRestaurantPhoto');
const modalSavedRestaurantComments = document.getElementById('savedRestaurantComments');

// MAKING ACTIVITY MODAL ELEMENTS GLOBAL
const modalActivityName = document.getElementById('modalActivityName');
const modalActivityDescription = document.getElementById('modalActivityDescription');
const modalActivityPhoto = document.getElementById('modalActivityPhoto');
const modalSavedActivityComments = document.getElementById('savedActivityComments')



// Modal restaurant function
// Show the modal to the user when view button is clicked
$(document).on("click", ".restaurantModalView", e => {

    e.preventDefault();
    restaurantID = $(`#restaurant-name-${e.target.dataset.idTarget}`).attr("sql")

    fetch('/api/itinerary/restaurant', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting all restaurant data CURRENT:', data);
            data.forEach(({ id, restaurantName, restaurantWebsite, restaurantAddress, restaurantPhone, restaurantPhoto, comments }, i) => {

                if (id == restaurantID) {
                    console.log("MATCHED")
                    modalRestaurantName.textContent = `${restaurantName}`;
                    modalRestaurantAddress.textContent = `${restaurantAddress}`;
                    modalRestaurantPhone.textContent = `${restaurantPhone}`;
                    modalRestaurantWebsite.href = `${restaurantWebsite}`;
                    modalRestaurantPhoto.src = `${restaurantPhoto}`;
                    modalSavedRestaurantComments.textContent = `${comments}`;
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log("modal view button clicked " + restaurantID)
    console.log("I've been clicked");
    $('#myRestaurantModal').modal('show');
});

//Update the text area information stored in the database when clicked
$(document).on("click", ".updateRestaurant", event => {
    event.preventDefault();
    console.log("Notes updates successfully")
    const modalRestaurantComment = document.getElementById("modalRestaurantComment").value;

    // Clear the comment field and reload the page
    $('#modalRestaurantComment').val('');
    location.reload();

    fetch(`/api/itinerary/${restaurantID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comments: modalRestaurantComment })
        })
        .catch((err) => console.error(err));

});

//Close the modal when user clicks on "close"
$(document).on("click", ".closeModal", event => {
    event.preventDefault();
    console.log("modal view button clicked ")
    $('#myRestaurantModal').modal('hide')
});




// Modal activity function
// Show the modal to the user when view button is clicked
$(document).on("click", ".activityModalView", e => {
    e.preventDefault();
    activityID = $(`#activity-name-${e.target.dataset.idTarget}`).attr("sql")


    fetch('/api/itinerary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log('Success in getting all activity data:', data);
            data.forEach(({ id, activityName, activityPhoto, activityDescription, comments }, i) => {
                if (id == activityID) {
                    modalActivityName.textContent = `${activityName}`;
                    modalActivityDescription.textContent = `${activityDescription}`;
                    modalActivityPhoto.src = `${activityPhoto}`;
                    modalSavedActivityComments.textContent = `${comments}`;
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    $('#myActivityModal').modal('show');

});


//Update the text area information stored in the database when clicked
$(document).on("click", ".updateActivity", event => {
    event.preventDefault();
    console.log("Notes updates successfully")
    const modalActivityComment = document.getElementById("modalActivityComment").value;

    // Clear the comment field and reload the page
    $('#modalActivityComment').val('');
    location.reload();

    fetch(`/api/itinerary/${activityID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comments: modalActivityComment })
        })
        .catch((err) => console.error(err));

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
  const restaurantID = $(`#restaurant-name-${e.target.dataset.idTarget}`).attr(
    "sql"
  );
  console.log(restaurantID);

  fetch(`/api/itinerary/${restaurantID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(console.log("item deleted"));
  $("#rNames").empty();
  getRestaurantNames();
});

// DELETE ROUTE
// ACTIVITY
$(document).on("click", ".deleteActivity", e => {
  e.preventDefault();
  const activityID = $(`#activity-name-${e.target.dataset.idTarget}`).attr(
    "sql"
  );
  console.log(activityID);

  fetch(`/api/itinerary/${activityID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(console.log("item deleted"));
  $("#aNames").empty();
  getActivityNames();
});
