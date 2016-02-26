/* global process*/
var express = require('express');
var bodyParser = require('body-parser');
var repositories = require('./routes/repositories');
var stackoverflow = require('./routes/stackoverflow'); 
var app = express();


//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', repositories); //This is our route middleware
app.use('/api', stackoverflow); 


app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});