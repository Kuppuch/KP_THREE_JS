function addLight() {
    const color = 0xFFFFFF;
    const intensity = 1;
    var light = new THREE.DirectionalLight(color);
    light.position.set(-50, 10, 50);
    light.castShadow = true;

    light.shadowMapSizeWidth = 512; // default
    light.shadowMapSizeHeight = 512; // default
    light.shadowCameraNear = 0.5; // default
    light.shadowCameraFar = 500; // default
    return light

    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 100, 0);
    // light.castShadow = true;
    // scene.add(light);

    // const light2 = new THREE.DirectionalLight(color, intensity);
    // light2.position.set(1, 2, -4);
    // light2.castShadow = true;
    // scene.add(light2);

    // const light3 = new THREE.DirectionalLight(color, intensity);
    // light3.position.set(1, -2, 4);
    // light3.castShadow = true;
    // scene.add(light3);
}
