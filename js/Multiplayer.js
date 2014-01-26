"use strict";

var Multiplayer = function() {};
Multiplayer.prototype.connect = function() {
	this.socket = io.connect('http://83.169.37.67:8081');
	this.socket.on('connect', function () {
		console.log("connected");
		$('#btnReady').attr('disabled', false);
	});
	var _this = this;
	this.socket.on('update', function(d) {
		_this.onUpdate.call(_this, d);
	});
	this.socket.on('start', function(d) {
		_this.onStart.call(_this, d);
	});
};

Multiplayer.prototype.ready = function() {
	this.socket.emit('ready', {});
};

Multiplayer.prototype.addScore = function() {
	this.socket.emit('addScore', {});
};

Multiplayer.prototype.onUpdate = function(d) {
	console.log(d);
	quizController.remainingSeconds = d.remainingTime;
	// update score
	$("#scoreCount").text(""+d.currentScore);
};

Multiplayer.prototype.onStart = function(d) {
	console.log(d);
	quizController.nextQuiz();
	quizController.startGameCountdown(d.remainingTime);
	$("#scoreCount").text("0");
};

