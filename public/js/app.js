
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
  var render = function(event) {
    var articleEl = document.createElement('article');
    articleEl.className = 'eventContainer';
    var headerEl = document.createElement('header');
    $(headerEl).html('<h6>' + event.artistName + '</h6>');
    $(articleEl).css('background-image', 'url(' + event.artistImage.url + ')');
    articleEl.appendChild(headerEl);
    var footerEl = document.createElement('footer');
    $(footerEl).html('<h6>' + event.place + '</h6');
    articleEl.appendChild(footerEl);
    return articleEl;
  }
  var Event = function(eventData) {
    this.place = eventData.place;
    this.date = eventData.date;
    this.artistName = eventData.artistName;
    this.artistImage = eventData.artistImage;
  };
  var eventList = [];
  var getNewEvents = function() {
    $.ajax({

      method: 'GET',

      // The URL to make the request to.
      url: 'http://api.eventful.com/json/events/search?location=Seattle&category=music&date=Future&image_sizes=small,medium,large&sort_order=date&sort_direction=ascending&page_number=10&page_size=20&app_key=tVX3L4p7bMfxKVRq',


      contentType: 'text/plain',
      dataType: 'jsonp',

      crossDomain: 'true',

      xhrFields: {

        withCredentials: false
      },

      headers: {
        // Set any custom headers here.
        // If you set any non-simple headers, your server must include these
        // headers in the 'Access-Control-Allow-Headers' response header.
        "Access-Control-Allow-Headers": "Access-Control-Allow-Access",
        "Access-Control-Allow-Access": "*"
      },

      success: function(res, req) {
        console.log(res.events);
        res.events.event.forEach(function(event){
          if(event.image != null){
            if(event.start_time > "2015-04-19")
              eventList.push(new Event({"artistName": event.title, "place": event.venue_name, "date": event.start_time, "artistImage": event.image.medium || 1}));
          }
        });
        console.log(eventList);
        eventList.forEach(function(event){
          $('.boxContainer').append(render(event));
        });
      },

      error: function(res, err) {
        console.log("error: " + err + " " + res);
      }
    });
  };
  //somebody pls convert this function to jquery if you have time

  getNewEvents();
});


