'use strict'

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


