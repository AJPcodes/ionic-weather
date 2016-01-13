angular.module('weather.controllers', [])

.controller('MainCtrl', function($scope, $http) {


    this.wundergroundAPIKEY = "5650f6ac11bcb150";

    //dummy data for display while geolacation data is loaded using the API's syntax for consistency
    this.data = {};

    //getting the geolocation data from the browser
    navigator.geolocation.getCurrentPosition(function(data){
        // console.log(data);
        this.lat = data.coords.latitude;
        this.longi = data.coords.longitude;
        callAPIWithLatLong();

    }.bind(this))

    // http://api.wunderground.com/api/5650f6ac11bcb150/geolookup/q/autoip.json

    $http.get("/api/" + this.wundergroundAPIKEY + "/conditions/forecast/geolookup/q/autoip.json")
    .then(function(response) {
       console.log(response.data);
       updateInfo(response.data);
    });

    //call the Forecast.io API
    var callAPIWithLatLong =  function(){

    console.log('getting Current Data');

   // 5650f6ac11bcb150/geolookup/q/autoip.json
    //geolookup/q/37.776289,-122.395234

    $http.get("/api/" + this.wundergroundAPIKEY + "/conditions/forecast/geolookup/q/" + this.lat + "," + this.longi + ".json")
    .then(function(response) {
       console.log(response.data);
       updateInfo(response.data);
      });

    }.bind(this)

    //update the data with data pulled from forecast.api
    //set timeout to update every 5 min
    var updateInfo = function(data){
        // console.log(data);
        this.data = data;

        setTimeout(function(){callAPI()}, 300000);
    }.bind(this)

})


