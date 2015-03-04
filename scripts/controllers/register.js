// register
var form = document.getElementById('frmRegister');
console.log(form);
form.addEventListener('submit', function(e){
  register();
  e.preventDefault();
});
var ref = new Firebase("https://sweltering-torch-2482.firebaseio.com/#-Jj1pCoPBtH7QZCefZUB|d0b25ae0e4d7afe19471f2cf7f7b3278");
var register = function(){

	var userEmail = form.querySelector('input[name="userEmail"]').value;
    console.log(userEmail);

    var userPassword = form.querySelector('input[name="userPassword"]').value;
    console.log(userPassword);

ref.createUser({
  email    : userEmail,
  password : userPassword
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
    document.querySelector("#loginStatus").innerHTML = "Registration Failed";
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
    document.querySelector("#loginStatus").innerHTML = "Registration Succeeded";
  }
});
}