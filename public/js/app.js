'use strict'
$(function() {
  var idCounter = 0;
  var pageCounter = 0;
  var tempEventList = 0;
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
    articleEl.className = 'events';
    var headerEl = document.createElement('header');
    $(headerEl).html('<h6>' + event.artistName + '</h6>');
    $(articleEl).css('background-image', 'url(' + event.artistImage + ')');
    articleEl.appendChild(headerEl);
    var footerEl = document.createElement('footer');
    $(footerEl).html('<h6>' + event.place + '</h6');
    articleEl.appendChild(footerEl);
    return articleEl;
  }
  var Event = function(eventData) {
    this.title = eventData.title;
    this.place = eventData.place;
    this.date = eventData.date;
    this.artistName = eventData.artistName;
    this.artistImage = eventData.artistImage;
  };
  var eventList = [];
  var getArtistImage = function(artistId, tempEventList) {
    $.ajax({
      url: "http://developer.echonest.com/api/v4/artist/images?api_key=DWFSTTYD33CDIEJD2&format=jsonp&results=1&start=0&id=songkick:artist:" + artistId,
      dataType: "jsonp",
      success: function(data) {
        tempEventList[tempEventList.length - 1].artistImage = data.response.images[0].url;
        $('.container').append(render(tempEventList[tempEventList.length - 1]));
      },
      error: function(data, err){
        console.log(err);
        console.log(data);
      }
    });
  };
  var getNewEvents = function() {
    $.ajax({
      url: "http://api.songkick.com/api/3.0/metro_areas/2846/calendar.json?apikey=vHjNp7OK5HaRjOho&jsoncallback=?&per_page=5&page=" + pageCounter,
      dataType: "jsonp",
      async: false,
      success: function(data){
      // data is JSON response object

        data.resultsPage.results.event.forEach(function(event){
              // debugger;
              var artistId;
              if(event.performance.length > 0) {
                // console.log(event.performance[0]);
                artistId = event.performance[0].artist.id;
                console.log(artistId);
                // console.log(getArtistImage(artistId));
              }

              // var tempArtist = $.parseJSON(event.performance[0]);
              // console.log(tempArtist);
              // console.log(tempArtist[0]);
          if(event.performance.length > 0) {
            if (tempEventList.length < 4) {
            // eventList.push(new Event({"artistName": event.title, "place": event.venue_name, "date": event.start_time, "artistImage": event.image.medium || 1}));
              tempEventList.push(new Event({"artistName": event.performance[0].displayName, "place": event.venue.displayName, "date": event.start.date}));
              getArtistImage(artistId, tempEventList);
            }
          }

        });
        // if (tempEventList.length < 4) {
        //   pageCounter++;
        //   getNewEvents();
        // }
        // console.log(eventList);
        // tempEventList.forEach(function(event){
        //   $(append(render(event));'.container').
        // });
      }
    });
    // $.ajax({

    //   method: 'GET',

    //   // The URL to make the request to.
    //   url: 'http://api.eventful.com/json/events/search?location=Seattle&category=music&date=Future&image_sizes=medium&sort_order=date&sort_direction=ascending&page_number=' + pageCounter + '&page_size=10&app_key=tVX3L4p7bMfxKVRq',


    //   contentType: 'text/plain',
    //   dataType: 'jsonp',

    //   crossDomain: 'true',

    //   xhrFields: {

    //     withCredentials: false
    //   },

    //   headers: {
    //     // Set any custom headers here.
    //     // If you set any non-simple headers, your server must include these
    //     // headers in the 'Access-Control-Allow-Headers' response header.
    //     "Access-Control-Allow-Headers": "Access-Control-Allow-Access",
    //     "Access-Control-Allow-Access": "*"
    //   },

    //   success: function(res, req) {
    //     console.log(res.events);
    //     res.events.event.forEach(function(event){
    //       if(event.image != null){
    //         if(event.start_time > "2015-04-19") {
    //           if (tempEventList.length < 4) {
    //           eventList.push(new Event({"artistName": event.title, "place": event.venue_name, "date": event.start_time, "artistImage": event.image.medium || 1}));
    //           tempEventList.push(new Event({"artistName": event.title, "place": event.venue_name, "date": event.start_time, "artistImage": event.image.medium || 1}));
    //           }
    //         }
    //       }
    //     });
    //     if (tempEventList.length < 4) {
    //       pageCounter++;
    //       getNewEvents();
    //     }
    //     console.log(eventList);
    //     tempEventList.forEach(function(event){
    //       $('.container').append(render(event));
    //     });
    //   },

    //   error: function(res, err) {
    //     console.log("error: " + err + " " + res);
    //   }
    // });
  pageCounter++;
  tempEventList = [];
  };
  $('#moreShows').click(getNewEvents);
  debugger;
  getNewEvents();
});


