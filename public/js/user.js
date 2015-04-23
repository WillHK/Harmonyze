'include strict'
$(function (){
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
