'use strict';

/**
 * @ngdoc service
 * @name angbaseApp.Auth
 * @description
 * # Auth
 * provides Auth methods for firebase
 */
angular.module('angbaseApp')
.factory("Auth", ["$firebaseAuth", "fbResource", "createProfile", function($firebaseAuth, fbResource, createProfile) {
  
  var auth = $firebaseAuth(fbResource.ref());

  var fns = 
   {
      auth: auth,
    
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
        resetPassword: function(email) {
          auth.$resetPassword({email: email})
          .then(function() {
            console.log("Password reset email sent successfully!");
          })
          .catch(function(error) {
            console.error("Error: ", error);
          });
});


  }
  return fns;
}])
.factory('createProfile', function(fbResource, $q, $timeout) {
      return function(id, email, name) {
        var ref = fbResource.ref('users', id), def = $q.defer();
        //this line does the actual creation of the profile.  the rest is promise code
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

        //convenience method if they don't provide a name.
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