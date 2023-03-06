function addTable() {
    const loader = new THREE.TextureLoader()
    const table_geometry = new THREE.BoxGeometry(50, 30, 30);
    // Для новых версий ThreeJS
    const table_material = new THREE.MeshBasicMaterial({
        map: loader.load('tex/wood-table.jpg'),
        side: THREE.DoubleSide
    });

    // Загрузка текстур для старых версий ThreeJS
    // var table_material = new THREE.MeshLambertMaterial({
    //     map: new THREE.ImageUtils.loadTexture('tex/wood-table.jpg')
    // });


    var table = new THREE.Mesh(table_geometry, table_material);
    table.position.y = -25;
    //table.castShadow = true;
    table.receiveShadow = true;
    return table

}