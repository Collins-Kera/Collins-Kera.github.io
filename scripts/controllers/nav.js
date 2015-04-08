'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('NavCtrl', function ($scope, Auth, $location) {
    if(Auth.getUser()){
      $scope.loggedIn = true;
    }
    Auth.onAuth(function(){
      $scope.loggedIn = true;
    })
    console.log($scope.loggedIn);
    $scope.logout = function() {
      Auth.logout();
      if(!Auth.getUser()){
        $scope.loggedIn = false;
      }
      //else show logout error
    }
  });