var express  = require('express'),
	app      = express(),
	http     = require('http').Server(app),
	httpRoutes = require('./routes/http'),
	socketRoutes = require('./socket'),
	mongoose = require('mongoose'),
	io       = require('socket.io')(http),
	allZones = require('./lib/allZones');
	
mongoose.connect('mongodb://localhost/TZ/mongo');
DB = new allZones();

//make new mongoose schema for username and password
var userSchema = new mongoose.Schema({
	username: String,
	password: String, 
	wins: Number,
	losses: Number
});
//making a model out of the schema
var User = mongoose.model('User', userSchema);


//populate database with cards if it is not already populated
var card = mongoose.model('card', { id: Number, value: Number, suit: Number }); //card variable
var game = mongoose.model('game', { id: String }); //game variable

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

// Attach routes
httpRoutes.attach(app, DB, __dirname);
socketRoutes.attach(io, DB);

//listen for users
var server = http.listen(3000, function(){
	console.log('TZ now running');
	console.log('listening on *:3000');
});