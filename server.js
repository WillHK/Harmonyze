'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/*', function(res,req) {
  res.status(404).send('404.html');
});

app.listen(process.env.PORT || 5000, function() {
  console.log('server running');
});
