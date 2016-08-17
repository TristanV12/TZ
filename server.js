var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var mongoose = require('mongoose');
var io       = require('socket.io')(http);
mongoose.connect('mongodb://localhost/TZ/mongo');

//make new mongoose schema for username and password
var userSchema = new mongoose.Schema({
	username: String,
	password: String	
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

io.on('connection', function(socket){
	
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('lobby', function(){
		console.log("ENTERING LOBBY");
	});
	socket.on('tutorial', function(){
		console.log("BEGINNING TUTORIAL");
	});
	socket.on('CreateRoom', function(){
		console.log("Creating Room");
		console.log("Navigating to Room");
	});
});
// card.find({}, function(err, users){
// 	console.log(users)
// });

// set the static files location (ex. /public/img will be /img for users)
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.get('/game/new_game/:game_id', function(req, res){

	card.findOne({ id: req.params.game_id }, function( err, c ){
		if(c == null){ //check if game already exists
			console.log("Creating game...");
			var new_game = new game({ id: req.params.game_id });
			new_game.save();
			console.log("Created");
			res.redirect("/game/" + req.params.game_id);
		}else{
			console.log("Error: game already exists");
		}
	});

});

app.get('/game/:game_id', function(req, res){
	res.sendFile(__dirname + '/public/game.html');
});

//navigating to the lobby
app.get('/lobby', function(req, res){
	res.sendFile(__dirname + '/public/lobby.html');
});

//navigating to the tutorial
app.get('/tutorial', function(req, res){
	res.sendFile(__dirname+'/public/tutorial.html');
});


//go to the login page
app.get('/login', function(req, res){
	res.sendFile(__dirname + "/public/login.html");
});

//register new user and send them to the lobby
app.post('/registerUser', function(req, res){
	
	var newUser = new User({ username: req.query.username, password: req.query.password});
	newUser.save();
	
	//ignore this
	result = {
		username: req.query.username,
		password: req.query.password
	};
	
	console.log(result);
	res.sendFile(__dirname + '/public/lobby.html');
});

//listen for users
var server = http.listen(3000, function(){
	console.log('TZ now running');
	console.log('listening on *:3000');
});