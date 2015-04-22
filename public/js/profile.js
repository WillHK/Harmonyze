'include strict'
$(function (){
var newUserString = localStorage.getItem('user1');

var newUser = JSON.parse(newUserString);

$('#userImg').append('<img src="' + newUser.picture + '"/>');
$('#userImg').append('<p>' + newUser.userId + '</p>');
$('#bio').append('<p>' + newUser.bio + '</p>');
var interests = newUser.orientation;
var userInterests = interests.replace("_", " ");
$('#interested_in').append('<p>' + userInterests + '</p>');
console.log(newUser.genres[0].value)
for (var i = 0; i < newUser.genres.length; i++) {
  var genres = newUser.genres[i].value;
  genres.replace('_', " ");
  $('#genres').append('<li>' + genres + '</li>');
}

// console.log(newUser.picture)

});
