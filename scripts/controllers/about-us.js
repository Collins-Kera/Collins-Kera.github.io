'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:MeetCtrl
 * @description
 * # MeetCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('MeetCtrl', function ($scope) {
  $scope.loggedIn = Auth.getAuth();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
