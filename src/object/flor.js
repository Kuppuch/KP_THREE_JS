function addFlor() {
    const loader = new THREE.TextureLoader()
    const flor_geometry = new THREE.PlaneGeometry(500, 300)
    const texture = loader.load('tex/Tiles074_1K-JPG/Tiles074_1K_Color.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(6, 3)
    const flor_material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.FrontSide
    });

    const plane = new THREE.Mesh(flor_geometry, flor_material)
    plane.rotation.x = 3 * Math.PI / 2
    plane.position.y = -40
    plane.position.z = 70

    plane.castShadow = true
    plane.receiveShadow = true

    return plane
}  