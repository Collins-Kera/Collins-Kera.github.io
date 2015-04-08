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
	
	$scope.changePassword = function(email, pass, newPass, confirm){
      $scope.err = null;
      if ( newPass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
      Auth.changePassword(email, pass, newPass).then(showError);
      }
    };
    function showError(err) {
      $scope.err = err;
    }
});
