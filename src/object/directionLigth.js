function directionLight(x, y, z) {
    const newObj = new THREE.SpotLight(0x777755, 2)

    newObj.castShadow = true
    newObj.angle = 0.4
    newObj.penumbra = 0.2
    newObj.decay = 2
    newObj.distance = 250

    newObj.position.set(x, y, z)

    return newObj
}

function setBarLight(count) {
    const lights = new THREE.Object3D()
    for (let i = 0; i < count; i += 1) {
        let x = -230 + 50 * i
        let dl = directionLight(x, 40, 0)

        const targetObject = new THREE.Object3D()
        targetObject.position.set(x, 10, 0)
        lights.add(targetObject);

        dl.target = targetObject;

        lights.add(dl)
    }
    return lights
}