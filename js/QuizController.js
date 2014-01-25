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
	if (this._currentQuiz) {
		if (this._currentQuiz._shadowIdx === number-1) {
			// right
			alert("YES, next quiz loading ...");
			this.nextQuiz();
		} else {
			alert("WROOOONG, try again");
		}
	}
};

QuizController.prototype.nextQuiz = function() {
	// choose random similar objects
	var seriesIdx = SimilarObjects[randomNumber(SimilarObjects.length-1)];
	var series = [AllObjects[seriesIdx[0]], AllObjects[seriesIdx[1]], AllObjects[seriesIdx[2]]];
	
	// choose random object for shadow
	var shadowIdx = randomNumber(2);
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

