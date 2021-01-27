
    // Getting restaurant name
    const getRestaurantNames = () => {
        fetch('/api/itinerary/restaurant', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting all restaurant names:', data);
            data.forEach(({ id, restaurantName }, i) => {
                //Dynamically creating elements to store save dratuarant results
                const rNames = document.getElementById('rNames');
                const rNameListItem = document.createElement('li');
                const viewItem = document.createElement('button');
                const deleteItem = document.createElement('button');

                //Adding attributes to created elements
                rNameListItem.setAttribute('sql', `${id}`)
                rNameListItem.setAttribute('id', `restaurant-name-${i}`)
                rNameListItem.className = `my-3`;
                viewItem.className = `restaurantModalView text-center`;
                deleteItem.className = `deleteRestaurant`
                viewItem.textContent = `View`;
                deleteItem.textContent = `Delete`;
                viewItem.setAttribute('data-id-target', `${i}`)
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
    }


        const getActivityNames = () => {
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
            data.forEach(({ id, activityName }, i) => {
                //Creating activity display elements dynamically
                const aNames = document.getElementById('aNames');
                const aNameListItem = document.createElement('li');
                const viewItem = document.createElement('button');
                const deleteActivity = document.createElement('button');
                
                //Assigning attributes to activity list elements
                aNameListItem.setAttribute('sql', `${id}`)
                aNameListItem.setAttribute('id', `activity-name-${i}`)
                aNameListItem.className = `my-3`;
                viewItem.className = `activityModalView text-center`;
                deleteActivity.className = `deleteActivity`;
                viewItem.textContent = `View`;
                deleteActivity.textContent = `Delete`;
                viewItem.setAttribute('data-id-target', `${i}`)
                deleteActivity.setAttribute('data-id-target', `${i}`)
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

        }

        getRestaurantNames();
        getActivityNames();
        

    // Modal restaurant function
    // Show the modal to the user when view button is clicked
    $(document).on("click", ".restaurantModalView", e => {
        e.preventDefault();
        const restaurantID = $(`#restaurant-name-${e.target.dataset.idTarget}`).attr("sql")
        console.log("modal view button clicked " + restaurantID)
        console.log("I've been clicked");
        $('#myRestaurantModal').modal('show');
    });
    //Close the modal when user clicks on "close"
    $(document).on("click", ".closeModal", event => {
        event.preventDefault();
        console.log("modal view button clicked ")
        $('#myRestaurantModal').modal('hide')
    });
    //Update the text area information stored in the database when clicked
    // $(document).on("click", ".update", event => {
    //     event.preventDefault();
    //     console.log("Notes updates successfully")
    // });


    // Modal activity function
    // Show the modal to the user when view button is clicked
    $(document).on("click", ".activityModalView", e => {
        e.preventDefault();
        const activityID = $(`#activity-name-${e.target.dataset.idTarget}`).attr("sql")
        console.log("I've been clicked");
        console.log("modal view button clicked " + activityID)
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
            data.forEach(({ id, restaurantName, restaurantWebsite, restaurantAddress, restaurantPhone, restaurantPhoto }, i) => {
                const modalRestaurantName = document.getElementById('modalRestaurantName');
                const modalRestaurantAddress = document.getElementById('modalRestaurantAddress');
                const modalRestaurantPhone = document.getElementById('modalRestaurantPhone');
                const modalRestaurantWebsite = document.getElementById('modalRestaurantWebsite');
                const modalRestaurantPhoto = document.getElementById('modalRestaurantPhoto');
                modalRestaurantName.textContent = `${restaurantName},`;
                modalRestaurantAddress.textContent = `${restaurantAddress}`;
                modalRestaurantPhone.textContent = `${restaurantPhone}`;
                modalRestaurantWebsite.href = `${restaurantWebsite}`;
                modalRestaurantPhoto.src = `${restaurantPhoto}`;
                console.log(`${id}`)
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
            e.preventDefault();
            const restaurantID = $(`#restaurant-name-${e.target.dataset.idTarget}`).attr("sql")
            console.log(restaurantID)
        
            fetch(`/api/itinerary/${restaurantID}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(console.log("item deleted"));
            $( "#rNames" ).empty();
            getRestaurantNames();
          });


          
        // DELETE ROUTE 
        // ACTIVITY
        $(document).on("click", ".deleteActivity", e => {
            e.preventDefault();
            const activityID = $(`#activity-name-${e.target.dataset.idTarget}`).attr("sql")
            console.log(activityID)
        
            fetch(`/api/itinerary/${activityID}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(console.log("item deleted"));
            $( "#aNames" ).empty();
            getActivityNames();

          });
