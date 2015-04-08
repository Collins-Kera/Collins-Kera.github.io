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
	else {
		window.location.reload();
		$scope.user = Auth.getUser();
	}
	$scope.changePassword = function(pass, newPass, confirm){
      $scope.err = null;
      if (!pass ) {
        $scope.err = 'Please enter current password';
      }
      if (!newPass ) {
        $scope.err = 'Please enter new password';
      }
      else if ( newPass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
      Auth.changePassword($scope.user.email, pass, newPass).then(showError);
      }
    };
    function showError(err) {
      $scope.err = err;
    }
});
