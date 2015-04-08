'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('ProfileCtrl', function ($scope) {
$scope.loggedIn = Auth.getAuth();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
