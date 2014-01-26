"use strict";

function randomNumber(max) {
	var min = 0;
	max++;
	var r = parseInt(Math.random()*(max-min)+min);
	if (r==max) r--;
	return r;
}

var QuizController = function() {};

QuizController.prototype.choose = function(number) {

	// outcome
	if (this._currentQuiz) {
		if (this._currentQuiz._shadowIdx === number-1) {
			
			//alert($("#scoreCount").text());

			$("#scoreCount").text(parseInt($("#scoreCount").text())+1)

			$(".win").clone().appendTo("body").show().fadeOut(4000);
			var winSound = new Audio('assets/sounds/win.wav');
			winSound.volume = 0.5;
            winSound.addEventListener('ended', function() {
                this.nextQuiz();
            }, false);
            winSound.play();

			//alert("YES, next quiz loading ...");
			this.nextQuiz();
		} else {
			$(".fail").clone().appendTo("body").show().fadeOut(4000);
			var failSound = new Audio('assets/sounds/fail.wav');
			failSound.volume = 0.5;
			failSound.play();
			//alert("WROOOONG, try again");
		}
	}
};

QuizController.prototype.nextQuiz = function() {
	
	// choose random similar objects
	var seriesIdx = SimilarObjects[randomNumber(SimilarObjects.length-1)];
	//var seriesIdx = SimilarObjects[2];
	var series = [AllObjects[seriesIdx[0]], AllObjects[seriesIdx[1]], AllObjects[seriesIdx[2]]];
	
	// choose random object for shadow
	var shadowIdx = randomNumber(2);
	//var shadowIdx = 0;
	var shadow = series[shadowIdx];
	
	// update UI
	this.displayQuiz(new Quiz(series, shadow, shadowIdx));
};

QuizController.prototype.displayQuiz = function(quiz) {
	// remember current quiz
	this._currentQuiz = quiz;
	
	// display shadow
	shadowScene.displayShadow.call(shadowScene, quiz._shadow);
	
	// display 3 picks
	pickScene.displayPicks.call(pickScene, quiz._series);
};

function startGameCountdown(remaining) {
	//alert("started");
	updateCountdownCounter(remaining)
}

function updateCountdownCounter(remaining) {

	$("#countdown").text(remaining);
	remaining--;

	if (remaining >= 0) {
		setTimeout(updateCountdownCounter,1000,remaining);
	} else {
		alert("time over!");
	}
}
