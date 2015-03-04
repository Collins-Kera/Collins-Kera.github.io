'use strict';

/**
 * @ngdoc service
 * @name angbaseApp.fbResource
 * @description
 * # fbResource
 * provides a FireBase ref connected to a specific path
 */
angular.module('angbaseApp')
  .factory('fbResource', function ($firebase) {
    //set FireBase URL
    var FBURL = 'https://improvement.firebaseio.com';

    //parse path variable
    function pathRef(args) {
      for (var i = 0; i < args.length; i++) {
        if (angular.isArray(args[i])) {
          args[i] = pathRef(args[i]);
        }
        else if( typeof args[i] !== 'string' ) {
          throw new Error('Argument '+i+' to firebaseRef is not a string: '+args[i]);
        }
      }
      return args.join('/');
    }

    //function to return a FireBase Ref for the passed in path
    function firebaseRef(path) { // jshint ignore:line
      var ref = new Firebase(FBURL); // jshint ignore:line
      var args = Array.prototype.slice.call(arguments);
      if( args.length ) {
        ref = ref.child(pathRef(args));
      }
      return ref;
    }

    return {
      ref: firebaseRef,
      sync: function(ref) {
          return $firebase(ref);
       }
    };

    

    
  })
  .factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://improvement.firebaseio.com");

  var auth = $firebaseAuth(ref);

  var fns = 
   {
      auth: auth,

      login: function(provider, opts) {
          return auth.$authWithOAuthPopup(provider, opts);
        },
        passwordLogin: function(creds, opts) {
          return auth.$authWithPassword(creds, opts);
        },

        logout: function() {
          auth.$unauth();
          
        },
        getUser: function() {
          return auth.$getAuth();
        },
        createAccount: function(email, pass, opts) {
          return auth.$createUser({email: email, password: pass})
            .then(function() {
              // authenticate so we have permission to write to Firebase
              return fns.passwordLogin({email: email, password: pass}, opts);
            })
            .then(function(user) {
              // store user data in Firebase after creating account
              //return createProfile(user.uid, email/*, name*/).then(function() {
               // return user;
              //});
            });
        },


  }
  return fns;
}]);