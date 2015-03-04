
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