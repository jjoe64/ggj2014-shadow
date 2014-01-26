var io = require('socket.io').listen(8081);

var GameState, ServerState;

function resetState() {
	GameState = {
		currentScore: 0,
		remainingTime: 0
	};

	ServerState = {
		playerSockets: [],
		playersReady: 0,
		playing: false,
		startTime: 0,
		roundTimeSeconds: 30
	};
}
resetState();

io.sockets.on('connection', function (socket) {
	// if already playing
	if (ServerState.playing) {
		var goneSeconds = (new Date().getTime() - ServerState.startTime)/1000;
		GameState.remainingTime = parseInt(ServerState.roundTimeSeconds-goneSeconds) +1;

		if (GameState.remainingTime <= 0) {
			endGame();
		}
	}

	// new player
	ServerState.playerSockets.push(socket);	

	if (ServerState.playing) {
		socket.emit('start', GameState);
	}
	
	// ready
	socket.on('ready', function (data) {
		ServerState.playersReady++;
		console.log(ServerState);
		if (ServerState.playerSockets.length > 0 && ServerState.playersReady >= ServerState.playerSockets.length) {
			startGame();
		}
	});
	
	// addScore
	socket.on('addScore', function (data) {
		GameState.currentScore++;
		updateGameState();
	});

	socket.on('disconnect', function () {
		var idx = 0;
		for (var i=0; i<ServerState.playerSockets.length; i++) {
			if (ServerState.playerSockets[i] == socket) { idx = 0; break; }
		}
		ServerState.playerSockets.splice(idx, 1);
		console.log("disconnect "+ServerState.playerSockets.length);
	});

});

function startGame() {
	GameState = {
		currentScore: 0,
		remainingTime: ServerState.roundTimeSeconds
	};
	ServerState.startTime = new Date().getTime();
	ServerState.playing = true;
	
	for (var i=0; i<ServerState.playerSockets.length; i++) {
		ServerState.playerSockets[i].emit('start', GameState);
	}
}

function endGame() {
	console.log("end game");
	for (var i=0; i<ServerState.playerSockets.length; i++) {
		ServerState.playerSockets[i].disconnect();
	}
	resetState();
}

function updateGameState() {
	var goneSeconds = (new Date().getTime() - ServerState.startTime)/1000;
	GameState.remainingTime = parseInt(ServerState.roundTimeSeconds-goneSeconds) +1;

	if (GameState.remainingTime <= 0) {
		endGame();
	}
	
	console.log(GameState);
	for (var i=0; i<ServerState.playerSockets.length; i++) {
		ServerState.playerSockets[i].emit('update', GameState);
	}
}

