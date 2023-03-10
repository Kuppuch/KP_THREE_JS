function addLight(x, y, z) {
    const color = 0xFFFFFF
    var light = new THREE.SpotLight(color, 0.7)
    light.position.set(x, y, z)
    light.angle = 15
    light.castShadow = true

    light.shadowMapSizeWidth = 512
    light.shadowMapSizeHeight = 512
    light.shadowCameraNear = 0.5
    light.shadowCameraFar = 500
    return light
}
