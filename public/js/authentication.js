$(function() {
  var ref = new Firebase("https://fiery-torch-6266.firebaseio.com");
  var authData = ref.getAuth();
  var logOut = function() {
    ref.unauth();
    $('#loggedIn').toggle();
    $('#loggedOut').toggle();
  };
  $('#loginform').on('submit', function(event) {
    event.preventDefault();
    ref.authWithPassword({
      email    : event.target.mail.value,
      password : event.target.password.value
    }, function(error, authData) {
      if (error) {
      console.log("Login Failed!", error);
      } else {
        console.log('logged in');
        console.log(authData.uid);
        $('#loggedIn').toggle();
        $('#loggedOut').toggle();
      }
    });
  });
  $('#loggedIn').toggle();
  $('#loggedOut').toggle();
  if (authData) {
    $('#loggedIn').toggle();
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    $('#loggedOut').toggle();
    console.log("User is logged out");
  }
  $('#logOut').on('click', logOut);
  function authDataCallback(authData) {
    if (authData) {

    } else {
      console.log("User is logged out");
    }
  };

});
