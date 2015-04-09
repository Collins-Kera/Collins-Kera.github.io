'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('ContactCtrl', function ($scope, $firebaseArray, Auth, $location ) {
    var ref = new Firebase("https://sweltering-torch-2482.firebaseio.com/messages");

    //create a synchronized array
    $scope.messages = $firebaseArray(ref);
    
    //add new message
    $scope.submitForm = function(name, email, phone, text) {
      $scope.messages.$add({
        name: name,
        email: email,
        phone: phone,
        text: text
      })
    }
  });
