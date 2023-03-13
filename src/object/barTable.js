function addBarTable() {
    const loader = new THREE.TextureLoader()
    const table_geometry = new THREE.BoxGeometry(350, 30, 30)
    // Для новых версий ThreeJS
    let texture = loader.load('tex/wood-table.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(6, 1)
    const table_material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.FrontSide
    })

    let table = new THREE.Mesh(table_geometry, table_material)
    table.position.y = -30
    table.position.x = -75
    table.castShadow = true
    table.receiveShadow = true

    // Загрузка текстур для старых версий ThreeJS
    // var table_material = new THREE.MeshLambertMaterial({
    //     map: new THREE.ImageUtils.loadTexture('tex/wood-table.jpg')
    // });

    texture = loader.load('tex/Marble 01_baseColor.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(6, 1)
    const top_table_material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.FrontSide
    })

    const top_table_geometry = new THREE.BoxGeometry(360, 5, 40)
    let top_table = new THREE.Mesh(top_table_geometry, top_table_material)
    top_table.position.y = -12.5
    top_table.position.x = -75
    top_table.castShadow = true
    top_table.receiveShadow = true

    return {
        table,
        top_table
    }

}