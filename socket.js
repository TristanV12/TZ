//for handling all the socket connections

var IO = null;
var DB = null;

var lobby = function(){
	console.log("ENTERING LOBBY");
};

var tutorial = function(){
	console.log("BEGINNING TUTORIAL");
};


var createRoom = function(){
	console.log("Creating Room");
	console.log("Navigating to Room");
}

var join = function(){
	
};

var move = function(){
	
};

var forfeit = function(){
	
};

var disconnect = function(){
	console.log('user disconnected');
};
/**
 * Attach route/event handlers for socket.io
 */
exports.attach = function(io, db) {
  IO = io;
  DB = db;

  // When a new socket connection is made
 io.on('connection', function (socket) {
    // Attach the event handlers
    //socket.on('join', join);
    //socket.on('move', move);
    //socket.on('forfeit', forfeit);
    socket.on('disconnect', disconnect);
	socket.on('disconnect', disconnect);
	socket.on('lobby', lobby);
	socket.on('tutorial', tutorial);
	socket.on('CreateRoom', createRoom);

    console.log('Socket '+socket.id+' connected');
  });
};