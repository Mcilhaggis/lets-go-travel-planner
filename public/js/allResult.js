$(document).ready(() => {

    // Getting restaurant name
    fetch('/api/itinerary/restaurant', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting all restaurant names:', data);
            data.forEach(({ restaurantName }, i) => {
                //Dynamically creating elements to store save dratuarant results
                const rNames = document.getElementById('rNames');
                const rNameListItem = document.createElement('li');
                const viewItem = document.createElement('button');
                const deleteItem = document.createElement('button');

                //Adding attributes to created elements
                rNameListItem.setAttribute('id', `restaurant-name-${i}`)
                rNameListItem.className = `my-3`;
                viewItem.className = `restaurantModalView text-center`;
                deleteItem.className = `deleteRestaurant`
                viewItem.textContent = `View`;
                deleteItem.textContent = `Delete`;
                deleteItem.setAttribute('data-id-target', `${i}`)
                rNameListItem.textContent = `${restaurantName}`;

                //Appending elements to the page
                rNames.appendChild(rNameListItem);
                rNameListItem.appendChild(viewItem);
                rNameListItem.appendChild(deleteItem);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    // Getting activity name
    fetch('/api/itinerary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting all activity names:', data);
            data.forEach(({ activityName }, i) => {
                //Creating activity display elements dynamically
                const aNames = document.getElementById('aNames');
                const aNameListItem = document.createElement('li');
                const viewItem = document.createElement('button');
                const deleteActivity = document.createElement('button');

                //Assigning attributes to activity list elements
                aNameListItem.className = `my-3`;
                viewItem.className = `activityModalView text-center`;
                deleteActivity.className = `deleteActivity`;
                viewItem.textContent = `View`;
                deleteActivity.textContent = `Delete`;
                aNameListItem.textContent = `${activityName}`;

                //Appending activity items to the page dynamically
                aNames.appendChild(aNameListItem);
                aNameListItem.appendChild(viewItem)
                aNameListItem.appendChild(deleteActivity)
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    // Modal restaurant function
    // Show the modal to the user when view button is clicked
    $(document).on("click", ".restaurantModalView", event => {
        event.preventDefault();
        console.log("I've been clicked");
        $('#myRestaurantModal').modal('show');
    });
    //Close the modal when user clicks on "close"
    $(document).on("click", ".closeModal", event => {
        event.preventDefault();
        $('#myRestaurantModal').modal('hide')
    });
    //Update the text area information stored in the database when clicked
    // $(document).on("click", ".update", event => {
    //     event.preventDefault();
    //     console.log("Notes updates successfully")
    // });


    // Modal activity function
    // Show the modal to the user when view button is clicked
    $(document).on("click", ".activityModalView", event => {
        event.preventDefault();
        console.log("I've been clicked");
        $('#myActivityModal').modal('show');
    });
    //Close the modal when user clicks on "close"
    $(document).on("click", ".closeModal", event => {
        event.preventDefault();
        $('#myActivityModal').modal('hide')
    });

    //Update the text area information stored in the database when clicked
    // $(document).on("click", ".update", event => {
    //     event.preventDefault();
    //     console.log("Notes updates successfully")
    // });        

    fetch('/api/itinerary/restaurant', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting all restaurant data:', data);
            data.forEach(({ restaurantName, restaurantWebsite, restaurantAddress, restaurantPhone, restaurantPhoto }, i) => {
                const modalRestaurantName = document.getElementById('modalRestaurantName');
                const modalRestaurantAddress = document.getElementById('modalRestaurantAddress');
                const modalRestaurantPhone = document.getElementById('modalRestaurantPhone');
                const modalRestaurantWebsite = document.getElementById('modalRestaurantWebsite');
                const modalRestaurantPhoto = document.getElementById('modalRestaurantPhoto');
                modalRestaurantName.textContent = `${restaurantName}`;
                modalRestaurantAddress.textContent = `${restaurantAddress}`;
                modalRestaurantPhone.textContent = `${restaurantPhone}`;
                modalRestaurantWebsite.href = `${restaurantWebsite}`;
                modalRestaurantPhoto.src = `${restaurantPhoto}`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    fetch('/api/itinerary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting all activity data:', data);
            data.forEach(({ activityName, activityPhoto, activityDescription }, i) => {
                const modalActivityName = document.getElementById('modalActivityName');
                const modalActivityDescription = document.getElementById('modalActivityDescription');
                const modalActivityPhoto = document.getElementById('modalActivityPhoto');
                modalActivityName.textContent = `${activityName}`;
                modalActivityDescription.textContent = `${activityDescription}`;
                modalActivityPhoto.src = `${activityPhoto}`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });



        // DELETE ROUTE 
        // RESTAURANT
        $(document).on("click", ".deleteRestaurant", e => {
            console.log("i'm clicked")
            e.preventDefault();
            const restaurantName = document.querySelector(`#restaurant-name-${e.target.dataset.idTarget}`).childNodes[0];
            // const { restaurantName } = data.id.target;
            JSON.parse(restaurantName)
            console.log(restaurantName)
        
            fetch(`/api/itinerary/${restaurantName}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(console.log("item deleted"));
          });



});