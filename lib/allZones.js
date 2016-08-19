//class to hold all the zone games currently occurring 
//can just replace this with the database?
var zone = require('./zone');

function allZones(){
	this.zones = {}
};

//function for adding a game to the current set of games
allZones.prototype.add = function(){
	
};

allZones.prototype.remove = function(key){
	
};


module.exports = allZones;