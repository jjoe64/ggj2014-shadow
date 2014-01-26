"use strict";

var PickScene = function() {
	this.setupEngine();
	this.setupScene();
};
PickScene.prototype.setupEngine = function() {
	// Get the Canvas element from our HTML below
	this.canvas = document.getElementById("pickCanvas");

	// Load BABYLON 3D engine and set the root directory
	this.engine = new BABYLON.Engine(this.canvas, true);

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
};
PickScene.prototype.setupScene = function() {
    var scene = new BABYLON.Scene(this.engine);
    scene.clearColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(15, 0, 0));
    __camera = camera;
    //camera.fov = 2;
    
	var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 10, 0), scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(1, 0, 0);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);
    
    /*
    var beforeRenderFunction = function () {
        // Camera
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.99)
            camera.beta = (Math.PI / 2) * 0.99;

        if (camera.radius > 150)
            camera.radius = 150;

        if (camera.radius < 5)
            camera.radius = 5;
    };

    scene.registerBeforeRender(beforeRenderFunction);
    */
    // Animations
    scene.registerBeforeRender(function () {
        //torus.rotation.x += 0.01;
        //torus.rotation.z += 0.02;
    });
    
	// Attach the camera to the scene
	//scene.activeCamera.attachControl(this.canvas);


	// Once the scene is loaded, just register a render loop to render it
	this.engine.runRenderLoop(function () {
		scene.render();
	});
	this.scene = scene;
};
PickScene.prototype.displayPicks = function(series) {
	if (this._currentMeshes) {
		for (var i=0; i<this._currentMeshes.length; i++) {
			this._currentMeshes[i].isVisible = false;
		}
	}
	var _this = this;
	this._currentMeshes = [];
	BABYLON.SceneLoader.ImportMesh(series[0].id, "assets/models/", series[0].file, this.scene, function (newMeshes, particleSystems) {
		_this._currentMeshes.push(newMeshes[0]);
		newMeshes[0].position.x = series[0].pickOffset[0];
		newMeshes[0].position.y = series[0].pickOffset[1];
		newMeshes[0].position.z = -20 + series[0].pickOffset[2];
		
		newMeshes[0].scaling.x *= series[0].pickScaleFactor;
		newMeshes[0].scaling.y *= series[0].pickScaleFactor;
		newMeshes[0].scaling.z *= series[0].pickScaleFactor;

	});
    
	BABYLON.SceneLoader.ImportMesh(series[1].id, "assets/models/", series[1].file, this.scene, function (newMeshes, particleSystems) {
		_this._currentMeshes.push(newMeshes[0]);
		newMeshes[0].position.x = series[1].pickOffset[0];
		newMeshes[0].position.y = series[1].pickOffset[1];
		newMeshes[0].position.z = series[1].pickOffset[2];

		newMeshes[0].scaling.x *= series[1].pickScaleFactor;
		newMeshes[0].scaling.y *= series[1].pickScaleFactor;
		newMeshes[0].scaling.z *= series[1].pickScaleFactor;
	});
    
	BABYLON.SceneLoader.ImportMesh(series[2].id, "assets/models/", series[2].file, this.scene, function (newMeshes, particleSystems) {
		_this._currentMeshes.push(newMeshes[0]);
		newMeshes[0].position.x = series[2].pickOffset[0];
		newMeshes[0].position.y = series[2].pickOffset[1];
		newMeshes[0].position.z = 20 + series[2].pickOffset[2];

		newMeshes[0].scaling.x *= series[2].pickScaleFactor;
		newMeshes[0].scaling.y *= series[2].pickScaleFactor;
		newMeshes[0].scaling.z *= series[2].pickScaleFactor;
	});
};

