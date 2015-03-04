
/*
console.log("in script");
var form = document.getElementById('frmLogin');
console.log(form);
form.addEventListener('submit', function(e){
  login();
  e.preventDefault();
});
var ref = new Firebase("https://sweltering-torch-2482.firebaseio.com");
var login = function () {
    console.log("in login function");
    
    var userEmail = form.querySelector('input[name="userEmail"]').value;
    console.log(userEmail);

    var userPassword = form.querySelector('input[name="userPassword"]').value;
    console.log(userPassword);

    ref.authWithPassword({
  email    : userEmail,
  password : userPassword
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
    document.querySelector("#loginStatus").innerHTML = "Login Failed";
  } else {
    console.log("Authenticated successfully with payload:", authData);
    document.querySelector("#loginStatus").innerHTML = "Login Successfull";
  }
});
}
*/
'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Methods for logging a user into the system.
 */
angular.module('angbaseApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    
    //in the scope so we can call it from teh view...attached to the Login button
    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    //attached to the Register button
    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.createAccount(email, pass, {rememberMe: true})
          .then(redirect, showError);
      }
    };

    //Send reset email...needs to be implemented in Auth
    $scope.resetPassword = function(email){
       Auth.resetPassword(email);  
          
      $scope.reset = false;

    };

    //reset form in view if they change their minds
    $scope.cancelReset = function(){
        $scope.reset = false;
    }; 

    //send them to the home screen if login successful  
    function redirect() {
      $location.path('/');
    }
    function redirectRegister() {
      $location.path('/register');
    }

    function showError(err) {
      $scope.err = err;
    }
  });