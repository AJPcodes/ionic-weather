angular.module('weather.controllers', [])

.controller('MainCtrl', function($scope, $http) {


    this.wundergroundAPIKEY = "5650f6ac11bcb150";
    this.data = {};
    this.searchHistory = {};
    this.searchHistory = angular.fromJson(window.localStorage.getItem('searchHistory')) || {};

    //getting the geolocation data from the browser
    navigator.geolocation.getCurrentPosition(function(data){
        // console.log(data);
        this.lat = data.coords.latitude;
        this.longi = data.coords.longitude;
        this.callAPIWithLatLong();

    }.bind(this))

    // http://api.wunderground.com/api/5650f6ac11bcb150/geolookup/q/autoip.json

    $http.get("/api/" + this.wundergroundAPIKEY + "/conditions/forecast/geolookup/q/autoip.json")
    .then(function(response) {
       console.log(response.data);
       updateInfo(response.data);
    });

    this.startSearch = function(keyEvent){
        console.log('keypress!');
        if (keyEvent.which === 13)
        this.search();
    };

    this.search = function(){

        $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.searchQuery)
        .then(function(response) {
           console.log(response.data.results[0]);
           this.lat = response.data.results[0].geometry.location.lat;
           this.longi = response.data.results[0].geometry.location.lng;
           this.callAPIWithLatLong();

           //get the formatted address
        var searchedPlace = response.data.results[0].formatted_address;

            //load search history from local storage
        var searchHistory = window.localStorage.getItem('searchHistory');
        // console.log(searchHistory);

            if (searchHistory){
                searchHistory = angular.fromJson(searchHistory);
            }

            if(searchHistory === null) {
                searchHistory = {};
            }

            searchHistory[searchedPlace] = {
                    lat: this.lat,
                    lng: this.longi
                };

        this.searchHistory = searchHistory;
        window.localStorage['searchHistory'] = angular.toJson(searchHistory);


    }.bind(this))

    }.bind(this);
    //call the Forecast.io API
    this.callAPIWithLatLong =  function(passedLat, passedLng){
        var lat = passedLat || this.lat;
        var lng = passedLng || this.longi;
       // 5650f6ac11bcb150/geolookup/q/autoip.json
        //geolookup/q/37.776289,-122.395234
        $http.get("/api/" + this.wundergroundAPIKEY + "/conditions/forecast/geolookup/q/" + lat + "," + lng + ".json")
        .then(function(response) {
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


