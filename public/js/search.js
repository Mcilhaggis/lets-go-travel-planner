$(document).ready(() => {
    function getActivityResultAPI(city) {
        $.get("/api/activity", { city: city }).then((data) => {
            console.log(data);
            //put data into your page;
        });
    }

    function getRestaurantAPI(city) {
        $.get("/api/restaurants", { city: city }).then((data) => {
            console.log(data);
            //put data into your page;
        });
    }

    $("#create-form").on("submit", event => {
        event.preventDefault();
        const cityName = ca.value.trim();
        console.log(ca.value.trim());
        getRestaurantAPI(cityName);
        getActivityResultAPI(cityName);
    });
});