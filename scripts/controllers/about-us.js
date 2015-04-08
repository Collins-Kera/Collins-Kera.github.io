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
  $scope.loggedIn = Auth.getUser();
    console.log($scope.loggedIn);
  });
