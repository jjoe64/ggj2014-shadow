"use strict";
var __camera;
// init 3d
var shadowScene = new ShadowScene();
var pickScene = new PickScene();

// business logic
var quizController = new QuizController();

$(document).ready(function() {
	quizController.nextQuiz();
	startGameCountdown(60);
});


