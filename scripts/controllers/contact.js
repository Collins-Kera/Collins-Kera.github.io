'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('ContactCtrl', function ($scope, Auth, $location ) {
    $scope.clearForm = function() {
      $scope.err = "Message Sent!";
    }
  });
