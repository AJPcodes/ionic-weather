angular.module('weather.controllers', [])

.controller('MainCtrl', function($scope, $http) {


    this.APIKEY = "6ce1f2b19c500b6653ff0068b9b900a0";

    //dummy data for display while geolacation data is loaded using the API's syntax for consistency
    this.data = {};
    this.data.currently = {temperature: 75,
                            summary: "Sunny"};
    this.data.hourly = {summary: "Please wait while your weather data is updated"};

    //getting the geolocation data from the browser
    navigator.geolocation.getCurrentPosition(function(data){
        // console.log(data);

        this.lat = data.coords.latitude;
        this.longi = data.coords.longitude;
        callAPI();
    }.bind(this))

    //call the Forecast.io API
    var callAPI =  function(){

    console.log('getting Current Data');

    $http.get("/api/forecast/" + this.APIKEY + "/" + this.lat + "," + this.longi)
    .then(function( response ) {
        data = response.data;
        updateInfo(data);
      });

    }.bind(this)

    //update the data with data pulled from forecast.api
    //set timeout to update every 5 min
    var updateInfo = function(data){
        console.log(data);
        this.data = data;

        setTimeout(function(){callAPI()}, 300000);
    }.bind(this)

})


