var CreatePickScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    
	var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 10, 0), scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(1, 0, 0);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);

    camera.setPosition(new BABYLON.Vector3(6, 0, 0));
    //camera.fov = 2;
    
    // palme test
	BABYLON.SceneLoader.ImportMesh(AllObjects[0].id, "assets/", "huskchair.babylon", scene, function (newMeshes, particleSystems) {
	newMeshes[0].castShadows=false;
		newMeshes[0].position.z = 10;
		newMeshes[0].scaling.x *= AllObjects[0].pickScaleFactor;
		newMeshes[0].scaling.y *= AllObjects[0].pickScaleFactor;
		newMeshes[0].scaling.z *= AllObjects[0].pickScaleFactor;
	});
    
	BABYLON.SceneLoader.ImportMesh(AllObjects[0].id, "assets/", "huskchair.babylon", scene, function (newMeshes, particleSystems) {
		newMeshes[0].scaling.x *= AllObjects[0].pickScaleFactor;
		newMeshes[0].scaling.y *= AllObjects[0].pickScaleFactor;
		newMeshes[0].scaling.z *= AllObjects[0].pickScaleFactor;
	});
    
	BABYLON.SceneLoader.ImportMesh(AllObjects[0].id, "assets/", "huskchair.babylon", scene, function (newMeshes, particleSystems) {
		newMeshes[0].position.z = -10;
		newMeshes[0].scaling.x *= AllObjects[0].pickScaleFactor;
		newMeshes[0].scaling.y *= AllObjects[0].pickScaleFactor;
		newMeshes[0].scaling.z *= AllObjects[0].pickScaleFactor;
	});
    
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
    
    return scene;
};

