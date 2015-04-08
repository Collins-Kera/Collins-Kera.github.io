'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:MeetCtrl
 * @description
 * # MeetCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('MeetCtrl', function ($scope, Auth, $location) {
  $scope.loggedIn = Auth.getUser();
    console.log($scope.loggedIn);
    $scope.logout = function() {
      Auth.logout().then(redirectHome);
    }
    function redirectHome() {
      $location.path('/');
    }
  });
