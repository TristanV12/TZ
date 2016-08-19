//the game object

//create a new game and initialize it

function Zone(){
	this.status = 'pending';
	//which player is the active player
	this.activePlayer = null;

	this.players = [];
	
	//keep track of the last time the game was modified
	this.modified = Date.now();
	
};

//initialize function for when both players are in and the game starts
//hand out six cards each
Zone.prototype.begin = function(){
	
	return true;
};

/*method to add a player to the game, after both players have join, set the status
	to active
*/
Zone.prototype.addPlayer = function(Player){
	
	
	//update the time
	this.modified = Date.now();
	return true;
};

/*
	remove a player from the game
*/
Zone.prototype.removePlayer = function(Player){
	
	this.modified = Date.now();
	return true;
};

/*
	apply the action and update the game
	the action should be a list of cards used
	probably will need to have a defense phase for the defender
*/
Zone.prototype.Action = function(action){
	//check to see if the move is valid
	
	//switch the active and inactive player's states
	
	//check win/loss
	return true;
};

Zone.prototype.Reaction = function(reaction){
	
	
	return true;
};

//if one of the players forfeit...
Zone.prototype.forfeit = function(Player){
	
};

//add other functions to use


//Export game object
module.exports = Zone;