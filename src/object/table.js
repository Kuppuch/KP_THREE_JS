function addTable() {
    const loader = new THREE.TextureLoader()
    const table_geometry = new THREE.BoxGeometry(350, 30, 30);
    // Для новых версий ThreeJS
    let texture = loader.load('tex/wood-table.jpg')
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 1);
    const table_material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    // Загрузка текстур для старых версий ThreeJS
    // var table_material = new THREE.MeshLambertMaterial({
    //     map: new THREE.ImageUtils.loadTexture('tex/wood-table.jpg')
    // });


    var table = new THREE.Mesh(table_geometry, table_material);
    table.position.y = -25;
    table.position.x = -75;
    table.castShadow = true;
    table.receiveShadow = true;
    return table

}