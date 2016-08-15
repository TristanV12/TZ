var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var mongoose = require('mongoose');
var io       = require('socket.io')(http);
mongoose.connect('mongodb://localhost/TZ/mongo');

//populate database with cards if it is not already populated
var card = mongoose.model('card', { id: Number, value: Number, suit: Number}); //card variable

// card.remove({}, function(err) { 
//    console.log('collection removed') 
// });

card.findOne({}, function( err, c ){
	if(c == null){ //check if cards have been initialized
		console.log("Running setup...");
		//loop to add cards
		//	2-10 numbered
		//	11 Jack
		//	12 Queen
		//	13 King
		//	14 Ace
		for (var i = 0; i < 52; ++i) {
			var new_card = new card({ id: i, value: (i % 13) + 2, suit: i % 4 });
			new_card.save();
		};
		//add Jokers
		//	15 Jokers
		//	Suit 4
		var new_card = new card({ id: 52, value: 15, suit: 4 });
		new_card.save();
		var new_card = new card({ id: 53, value: 15, suit: 4 });
		new_card.save();
		console.log("Setup complete");
	}else{
		console.log("Cards already loaded.");
	}
});
// card.find({}, function(err, users){
// 	console.log(users)
// });

// set the static files location (ex. /public/img will be /img for users)
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('index.html');
});

http.listen(3000, function(){
	console.log('TZ now running');
	console.log('listening on *:3000');
});