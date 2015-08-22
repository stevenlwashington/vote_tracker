var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/secret', function(request, response) {
  response.send('Welcome, you have finally arrived. This is where we keep the treats.');
})

app.use(function(request, response, next) {
  response.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running port' + app.get('port'));
});
