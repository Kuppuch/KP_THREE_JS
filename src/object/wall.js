function addWall() {
    const loader = new THREE.TextureLoader()
    const room_geometry = new THREE.BoxGeometry(500, 120, 300);
    // Для новых версий ThreeJS
    const room_material = new THREE.MeshLambertMaterial({
        map: loader.load('tex/wall.jpg'),
        side: THREE.BackSide
    });

    var room = new THREE.Mesh(room_geometry, room_material);
    room.position.y = 19.9;
    room.position.z = 70;
    //room.castShadow = true;
    room.receiveShadow = true;
    return room

}