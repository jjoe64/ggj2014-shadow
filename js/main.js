"use strict";

// init 3d
var shadowScene = new ShadowScene();
var pickScene = new PickScene();

// business logic
var quizController = new QuizController();

// start
quizController.nextQuiz();

