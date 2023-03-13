function addPourer() {
    var pourer; 
    const geometry = new THREE.BoxGeometry(4, 3, 3);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        side: THREE.FrontSide,
        roughness: 0,
        metalness: 1,
        normalScale: new THREE.Vector2(10, 10),
        displacementScale: 1
    });
    pourer = new THREE.Mesh(geometry, material);
    pourer.position.y = 3.5;
    pourer.position.z = 2;
    pourer.castShadow = true;
    pourer.receiveShadow = true;
    return pourer
}