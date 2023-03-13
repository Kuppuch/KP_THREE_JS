function addWindow() {
    let objects = []
    const loader = new THREE.TextureLoader()
    const flor_geometry = new THREE.PlaneGeometry(50, 70)
    const texture = loader.load('tex/window.png')
    const flor_material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.FrontSide
    });

    const plane = new THREE.Mesh(flor_geometry, flor_material);
    // plane.rotation.x = 3 * Math.PI / 2;
    plane.position.x = -100
    plane.position.y = 30
    plane.position.z = -79.5

    plane.castShadow = true
    plane.receiveShadow = true

    objects.push(plane)

    plane2 = plane.clone()
    plane.position.x = 100
    objects.push(plane2)


    return objects
}