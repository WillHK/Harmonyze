'use strict'
$(function() {
  // var ref = new Firebase("https://fiery-torch-6266.firebaseio.com");
  var User = function(userId, userName,  email, password, age, gender, bio, orientation, picture, genres) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this.password = password;//NO PLAINTEXT PASSWORDS. THIS IS BAD WHY AM I DOING THIS?
    this.age = age;
    // this.neighborhood = userData.neighborhood;
    this.gender = gender;
    this.bio = bio;
    this.orientation = orientation;
     this.picture = picture; //expects a URL to a picture
     this.genres = genres;
    this.friends = []; //will be populated as user adds friends from site
    this.pastEvents = []; //will be populated as user attends events
  };
  $('#submit').on("click", function (event) {
    event.preventDefault();
    var userData = $('form').serializeArray();
    var userName = userData[0].value;
    var userId = userData[1].value;
    var email = userData[2].value;
    var password = userData[3].value;
    var age = userData[4].value;
    if (userData[5].value === 'under_18' ) {
      alert("you must be 18 or older to use harmonyze!");
      return false;
    }
    var gender = userData[6].value;
    var bio = userData[7].value;
    // var orientation = userData[8].value;
    if (userData[8] === undefined||null) {
      alert('looks like you forgot something!');
      return false;
    }
      else {
       var orientation = userData[9].value;
    }
    var picture = userData[8].value;
    console.log(picture);
    console.log(orientation)
    var genres = [];
    for (var i = 10; i< 18; i++) {
      if (userData[i] !== null) {
        genres.push(userData[i]);
      }
    }
    for (var i = 0; i < userData.length; i++) {
      if (userData[i]===undefined || null) {
        alert('it looks like you forgot something!');
        return false;
      }
    }
      var user1 = new User(userId, userName,  email, password, age, gender, bio, orientation, picture, genres);
    var usersRef = ref.child('users');
    ref.createUser({
    email       : user1.email,
    password    : user1.password,
  }, function(error, userData) {
  if (error) {
    alert("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
    ref.authWithPassword({
      email    : user1.email,
      password : user1.password
    }, function(error, authData) {
      if (error) {
      console.log("Login Failed!", error);
      } else {
        usersRef.push({
    age         : user1.age,
    gender      : user1.gender,
    bio         : user1.bio,
    orientation : user1.orientation,
    picture     : user1.picture
    });
      console.log("Authenticated successfully with payload:", authData);
      window.location.replace('user.html');
      }
    }, {
      remember: "sessionOnly"
  });

  }
  })
  var userString = JSON.stringify(user1);
  localStorage.setItem('user1', userString);


});
});
