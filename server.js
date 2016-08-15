var app      = require('express')();
var http     = require('http').Server(app);
var mongoose = require('mongoose');
var io       = require('socket.io')(http);
mongoose.connect('mongodb://localhost/TZ/mongo');

//populate database with cards if it is not already populated
var card = mongoose.model('card', { id: Number, value: Number, suit: Number}); //card variable
cards = card.findOne({}, function( err, c=null ){
	if(c == null){
		for (var i = 0; i < 52; ++i) {
			var new_card = new card({ id: i, value: (i % 13) + 2, suit: i % 4 });
			new_card.save();
		};
	}
});
card.find({}, function(err, users){
	console.log(users)
});


app.get('/', function(req, res){
	res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
	console.log('TZ now running');
	console.log('listening on *:3000');
});