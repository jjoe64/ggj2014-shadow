var io = require('socket.io').listen(8081);

var GameState = {
	currentScore: 0,
	remainingTime: 0
};

var SeverState = {
	playerSockets: [],
	playersReady: 0,
	playing: false,
	startTime: 0,
	roundTimeSeconds: 30
};

io.sockets.on('connection', function (socket) {
	if (ServerState.playing) return;
	
	// new player
	ServerState.playerSockets.push(socket);
	
	// ready
	socket.on('ready', function (data) {
		playersReady++;
		if (playersReady == playerSockets.length) {
			startGame();
		}
	});
	
	// addScore
	socket.on('addScore', function (data) {
		GameState.currentScore++;
		updateGameState();
	});

	socket.on('disconnect', function () {
		//TODO ServerState.playerSockets
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
	
}

function updateGameState() {
	var goneSeconds = (new Date().getTime() - ServerState.startTime)/1000;
	GameState.remainingTime = ServerState.roundTimeSeconds-goneSeconds;
	if (GameState.remainingTime <= 0) {
		endGame();
	}
	for (var i=0; i<ServerState.playerSockets.length; i++) {
		ServerState.playerSockets[i].emit('update', GameState);
	}
}

