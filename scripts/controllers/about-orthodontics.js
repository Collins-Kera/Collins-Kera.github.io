'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('AboutCtrl', function ($scope, Auth) {
$scope.loggedIn = Auth.getUser();
    console.log($scope.loggedIn);
  });