'include strict'
$(function (){
var newUserString = localStorage.getItem('user1');
var newUser = JSON.parse(newUserString);

$('#userImg').append('<a href ="profile.html"><img src="' + newUser.picture + '"/></a>');
$('#userImg').append('<p>' + newUser.userId + '</p>');



});
