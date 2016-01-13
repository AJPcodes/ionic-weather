// Ionic Starter App

//my Forecast.io API Key  6ce1f2b19c500b6653ff0068b9b900a0
//wunderground 5650f6ac11bcb150  email yat97832@iaoss.com password 123456


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('weather', ['ionic', 'weather.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider){

    // $stateProvider.state('weather', {
    //   url: '/weather',
    //   abtract: true,
    //   templateUrl: 'templates/static.html',
    //   controller: 'MainCtrl as ctrl'
    // }),

    $stateProvider.state('main', {
      url: '/main',
      templateUrl: 'templates/mainPage.html',
      // controller: 'MainCtrl as ctrl'
    });

    $urlRouterProvider.otherwise('/main');
})

  // // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // // Each tab has its own nav history stack:

  // .state('tab.dash', {
  //   url: '/dash',
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-dash.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })