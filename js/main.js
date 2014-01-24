// Get the Canvas element from our HTML below
var canvas = document.getElementById("renderCanvas");

// Load BABYLON 3D engine and set the root directory
var engine = new BABYLON.Engine(canvas, true);

var scene = CreateShadowsTestScene(engine);

// Attach the camera to the scene
scene.activeCamera.attachControl(canvas);


// Once the scene is loaded, just register a render loop to render it
engine.runRenderLoop(function () {
   scene.render();
});

