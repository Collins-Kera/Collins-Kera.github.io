'use strict';

/**
 * @ngdoc overview
 * @name angbaseApp
 * @description
 * # angbaseApp
 *
 * Main module of the application.
 */
angular
  .module('angbaseApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      //add a new route here for each new page added to the site
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about-us', {
        templateUrl: 'views/about-us.html',
        controller: 'MeetCtrl'
      })
      .when('/about-orthodontics', {
        templateUrl: 'views/about-orthodontics.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      // .when('/services', {
      //   templateUrl: 'views/services.html',
      //   controller: 'ServicesCtrl'
      // })
      // .when('/register', {
      //   templateUrl: 'views/register.html',
      //   controller: 'RegisterCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });
