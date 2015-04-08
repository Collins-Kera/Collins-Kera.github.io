'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.loggedIn = Auth.getAuth();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
