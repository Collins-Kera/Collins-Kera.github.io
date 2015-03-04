
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
  var msg = document.querySelector("#loginStatus");
  if (error) {
    console.log("Login Failed!", error);
    msg.innerHTML = "Login Failed";
  } else {
    console.log("Authenticated successfully with payload:", authData);
    msg.innerHTML = "Login Successfull";
    }
});
}