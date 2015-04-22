'use strict'
$(function() {
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
    var orientation = userData[8].value;
    var picture = userData[9].value;
    var genres = [];
    for (var i = 10; i< 18; i++) {
      if (i !== null || undefined || 0) {
        genres.push(userData[i]);
      }
    }
  var user1 = new User(userId, userName,  email, password, age, gender, bio, orientation, picture, genres);
  console.log(user1);
  window.location.replace("index.html")
  })

});
