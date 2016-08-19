//handing all the html connections

var DB = null;
User = null;

var home = function(req, res){
	res.sendFile('index.html');
};

var lobby = function(req, res){
	res.sendFile(__dirname + '/public/lobby.html');
};

var makeGame = function(req, res){
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
};

var game = function(req, res){
	res.sendFile(__dirname + '/public/game.html');
};

var tutorial = function(req, res){
	res.sendFile(__dirname+'/public/tutorial.html');
};

var login = function(req, res){
	res.sendFile(__dirname + "/public/login.html");
};

var register = function (req, res){
	
	var newUser = new User({ username: req.query.username, password: req.query.password, wins: 0, losses: 0});
	newUser.save();
	
	//ignore this
	result = {
		username: req.query.username,
		password: req.query.password
	};
	
	console.log(result);
	res.sendFile(__dirname + '/public/lobby.html');
};

var invalid = function(req, res) {
  res.redirect('/');
};

/**
 * Attach route handlers to the app
 */
exports.attach = function(app, db) {
	DB = db;
	User = user;
	app.get('/',         home);
	app.get('/game/:id', game);
	app.get('/login', login);
	app.get('/game/new_game/:game_id', makeGame);
	app.get('/game/:game_id', game);
	app.get('/lobby', lobby);
	//app.post('/start',   startGame);
	//app.post('/join',    joinGame);
	app.post('/registerUser', register);
	  
	app.all('*',         invalid);
};