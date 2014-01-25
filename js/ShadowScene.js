"use strict";

var ShadowScene = function() {
	this.setupEngine();
	this.setupScene();
};
ShadowScene.prototype.setupEngine = function() {
	// Get the Canvas element from our HTML below
	this.canvas = document.getElementById("shadowCanvas");

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
ShadowScene.prototype.setupScene = function() {
    var scene = new BABYLON.Scene(this.engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0.1, 10, 0));
    camera.fov = 2;

    this.light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, -0.2), scene);
    this.light.position = new BABYLON.Vector3(0, 30, 0);
    this.light.intensity = 1.0;

    // Ground
    var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    //groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    //groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -2.05;
    ground.material = groundMaterial;
	ground.receiveShadows = true;
    
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
    
    // Animations
    scene.registerBeforeRender(function () {
        //torus.rotation.x += 0.01;
        //torus.rotation.z += 0.02;
    });
    
	// Attach the camera to the scene
	scene.activeCamera.attachControl(this.canvas);


	// Once the scene is loaded, just register a render loop to render it
	this.engine.runRenderLoop(function () {
		scene.render();
	});
	this.scene = scene;
};
ShadowScene.prototype.displayShadow = function(obj) {
	if (this._currentMesh) {
		this._currentMesh.isVisible = false;
	}
	var _this = this;
	BABYLON.SceneLoader.ImportMesh(obj.id, "assets/models/", obj.file, this.scene, function (newMeshes, particleSystems) {
		_this._currentMesh = newMeshes[0];
		newMeshes[0].position.y = 20.0;
		newMeshes[0].scaling.x *= obj.scaleFactor;
		newMeshes[0].scaling.y *= obj.scaleFactor;
		newMeshes[0].scaling.z *= obj.scaleFactor;
		
		// Shadows
		var shadowGenerator = new BABYLON.ShadowGenerator(512, _this.light);
		shadowGenerator.getShadowMap().renderList.push(newMeshes[0]);
	});
};

