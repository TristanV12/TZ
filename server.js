var app      = require('express')();
var http     = require('http').Server(app);
var mongoose = require('mongoose');
var io       = require('socket.io')(http);
mongoose.connect('mongodb://localhost/TZ/mongo');

app.get('/', function(req, res){
	res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
	console.log('TZ now running');
	console.log('listening on *:3000');
});