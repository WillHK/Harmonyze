'include strict'
$(function (){
var eventId = /([0-9])\w+/.exec(window.location.search)[0];
var eventObj = localStorage.getItem(eventId);
console.log(eventObj);
var newUserString = localStorage.getItem('user1');
var newUser = JSON.parse(newUserString);

$('#userImg').append('<a href ="profile.html"><img src="' + newUser.picture + '"/></a>');
$('#userImg').append('<p>' + newUser.userId + '</p>');

$('#comment_form').on('submit', function (event){
  event.preventDefault();
  var formData = $(this).serializeArray();
  var comment = formData[0].value;
  $('#comments').append('<li>' + newUser.userId + " - " + comment + '</li');
});


});
