"use strict";

function ShadowCanvas() {
	// Get the Canvas element from our HTML below
	var canvas = document.getElementById("shadowCanvas");

	// Load BABYLON 3D engine and set the root directory
	var engine = new BABYLON.Engine(canvas, true);

	/* BABYLON.SceneLoader.Load("assets/", "huskchair.babylon", engine, function (newScene) {
		         // Wait for textures and shaders to be ready
		         newScene.executeWhenReady(function () {
		             // Attach camera to canvas inputs
		             newScene.activeCamera.attachControl(canvas);

		             // Once the scene is loaded, just register a render loop to render it
		             engine.runRenderLoop(function() {
		                 newScene.render();
		             });
		         });
		     }, function (progress) {
		         // To do: give progress feedback to user
		     });
	*/        
	var scene = CreateShadowsTestScene(engine);

	// Attach the camera to the scene
	scene.activeCamera.attachControl(canvas);


	// Once the scene is loaded, just register a render loop to render it
	engine.runRenderLoop(function () {
		scene.render();
	});
}

