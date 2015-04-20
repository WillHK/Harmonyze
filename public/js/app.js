'use strict'
$(function() {
  var User = function(userData) {
    this.userId = userData.id;
    this.userName = userData.name;
    this.password = userData.password; //NO PLAINTEXT PASSWORDS. THIS IS BAD WHY AM I DOING THIS?
    this.neighborhood = userData.neighborhood;
    this.picture = userData.picture; //expects a URL to a picture
    this.orientation = userData.orientation;
    this.gender = userData.gender;
    this.friends = []; //will be populated as user adds friends from site
    this.pastEvents = []; //will be populated as user attends events
  };

  var Event = function(eventData) {
    this.name = eventData.name;
    this.place = eventData.place;
    this.artistName = eventData.artistName;
    this.artistImage = eventData.artistImage;
  };
});
 $.ajax({
    url: 'http://api.jambase.com/events?zipCode=98101&radius=50&page=0&api_key=mnenyzm7ngsrdnmmpqpqq6yd',
    method: 'GET',
   })
  .done(function(res) {
    console.log(res);

  })
  .fail(function(err) {
    console.log(err);
  });


