'include strict'
$(function (){
var newUserString = localStorage.getItem('user1');

var newUser = JSON.parse(newUserString);

$('#userImg').append('<img src="' + newUser.picture + '"/>');
$('#userImg').append('<p>' + newUser.userId + '</p>');

// console.log(newUser.picture)

});
