var CreatePickScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, -0.2), scene);
    light.position = new BABYLON.Vector3(0, 30, 0);

    light.intensity = 1.0;

    camera.setPosition(new BABYLON.Vector3(10, 0, 0));
    //camera.fov = 2;
    
    // palme test
	BABYLON.SceneLoader.ImportMesh(AllObjects[0].id, "assets/", "huskchair.babylon", scene, function (newMeshes, particleSystems) {
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

