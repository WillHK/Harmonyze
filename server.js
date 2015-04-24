'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req,res) {
  res.status(404).sendFile(__dirname + '/public/404.html')
});

app.listen(process.env.PORT || 5000, function() {
  console.log('server running');
});
