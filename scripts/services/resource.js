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
    var FBURL = 'https://sweltering-torch-2482.firebaseio.com';

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
  .factory("Auth", ["$firebaseAuth", "fbResource", "createProfile", function($firebaseAuth, fbResource, createProfile) {
  
  var auth = $firebaseAuth(fbResource.ref());

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
              return createProfile(user.uid, email/*, name*/).then(function() {
                return user;
              });
            });
        },


  }
  return fns;
}])
.factory('createProfile', function(fbResource, $q, $timeout) {
      return function(id, email, name) {
        var ref = fbResource.ref('users', id), def = $q.defer();
        ref.set({email: email, name: name||firstPartOfEmail(email)}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });

        function firstPartOfEmail(email) {
          return ucfirst(email.substr(0, email.indexOf('@'))||'');
        }

        function ucfirst (str) {
          // credits: http://kevin.vanzonneveld.net
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        }

        return def.promise;
      };
    });