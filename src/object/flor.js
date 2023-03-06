function addFlor() {
    const flor_geometry = new THREE.PlaneGeometry(500, 300);
    const texture = loader.load('tex/Tiles074_1K-JPG/Tiles074_1K_Color.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 3);
    const flor_material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(flor_geometry, flor_material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -40;
    plane.position.z = 70;
    return plane

}  