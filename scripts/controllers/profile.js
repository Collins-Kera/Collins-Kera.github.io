'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('ProfileCtrl', function ($scope, Auth, $location) {
	if(!Auth.getUser()){
		$scope.err = "Please Login";
		$location.path('/login');
	}
});
