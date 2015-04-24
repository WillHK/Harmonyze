'use strict'
$(function() {
  var pageCounter = 0;
  var idCounter = 0;
  var pageCounter = 1;
  var tempEventList = 0;
  var render = function(event) {
    var articleEl = document.createElement('article');
    articleEl.className = 'events';
    var headerEl = document.createElement('header');
    $(headerEl).html('<h6>' + event.artistName + '</h6>');
    $(articleEl).css('background-image', 'url(' + event.artistImage + ')');
    articleEl.appendChild(headerEl);
    var footerEl = document.createElement('footer');
    $(footerEl).html('<h6>' + event.place + '</h6>');
    articleEl.appendChild(footerEl);
    articleEl.id = event.eventId;
    return articleEl;
  }
  var Event = function(eventData) {
    this.eventId = eventData.id;
    this.title = eventData.title;
    this.place = eventData.place;
    this.date = eventData.date;
    this.artistName = eventData.artistName;
    this.artistImage = eventData.artistImage;
  };
  var eventList = [];
  var getArtistImage = function(artistId, event) {
    $.ajax({
      url: "http://developer.echonest.com/api/v4/artist/images?api_key=DWFSTTYD33CDIEJD2&format=jsonp&results=1&start=0&id=songkick:artist:" + artistId,
      dataType: "jsonp",
      success: function(data) {
        if(data.response.images){
          event.artistImage = data.response.images[0].url;
          $('.container').append(render(event));
          $('.events').on('click', function() {
            var eventJSON = JSON.stringify(event);
            localStorage.setItem(this.id, eventJSON);
            window.location.replace('event.html?ID=' + this.id);
            });
        }
      },
      error: function(data, err){
        console.log(err);
        console.log(data);
      }
    });
  };
  var getNewEvents = function() {
    $.ajax({
      url: "http://api.songkick.com/api/3.0/metro_areas/2846/calendar.json?apikey=vHjNp7OK5HaRjOho&jsoncallback=?&per_page=8&page=" + pageCounter,
      dataType: "jsonp",
      async: false,
      success: function(data){
      // data is JSON response object

        data.resultsPage.results.event.forEach(function(event){
              var artistId;
              console.log(event);
              if(event.performance.length > 0) {
                artistId = event.performance[0].artist.id;
              }
          if(event.performance.length > 0) {
            if (tempEventList.length < 8) {
              eventList.push(new Event({"artistName": event.performance[0].displayName, "place": event.venue.displayName, "date": event.start.date, "id": event.id, "title": event.displayName}));
              tempEventList.push(new Event({"artistName": event.performance[0].displayName, "place": event.venue.displayName, "date": event.start.date, "id": event.id, "title": event.displayName}));
              getArtistImage(artistId, tempEventList[tempEventList.length - 1]);
            }
          }

        });

      }
    });
  pageCounter++;
  tempEventList = [];
  };
  $('#moreShows').click(getNewEvents);
  getNewEvents();
});


