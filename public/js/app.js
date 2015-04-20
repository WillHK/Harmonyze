'use strict'
// var filepath = function(image) {
//     image.forEach(function(img) {
//       filePathArray.push(img.link);

//     });
//   };
 $.ajax({
    url: 'https://api.eventful.com/json/events/search?location=Seattle&category=music&date=future&app_key=tVX3L4p7bMfxKVRq',
    method: 'GET',
 headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  })
  .done(function(res) {
    concertObject = res.events.event[1]
    console.log(concertObject);

  })
  .fail(function(err) {
    console.log(err);
  });

// });
