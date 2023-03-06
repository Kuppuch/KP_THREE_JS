function addWall() {

    const room_geometry = new THREE.BoxGeometry(500, 120, 300);
    // Для новых версий ThreeJS
    const room_material = new THREE.MeshBasicMaterial({
        map: loader.load('tex/wall.jpg'),
        side: THREE.DoubleSide
    });

    var room = new THREE.Mesh(room_geometry, room_material);
    room.position.y = 19.9;
    room.position.z = 70;
    //room.castShadow = true;
    room.receiveShadow = true;
    return room

}