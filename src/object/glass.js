function addGlass() {
    glass = new THREE.Object3D;
    var glass_material = new THREE.MeshPhongMaterial({
        color: 0xEADAAF,
        specular: 0xEADAAF,
        shininess: 50,
        blending: THREE.NormalBlending,
        depthTest: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });

    var j = 0;
    var points = [];
    for (var i = -2.4; i < 0.7; i = i + 0.1) {
        j = j + 2;
        points.push(new THREE.Vector3(1 + 1 * Math.exp(-i * i), 2 * i, 0));
    }

    var glass_geometry = new THREE.LatheGeometry(points, 32);
    object = new THREE.Mesh(glass_geometry, glass_material);
    object.position.set(0, 6.3, 0);
    glass.add(object);

    var geometry = new THREE.CylinderGeometry(1, 2, 1, 32);
    var disc1 = new THREE.Mesh(geometry, glass_material);
    disc1.position.set(0, 1, 0);
    glass.add(disc1);

    glass.position.set(0, -7.5, 2);
    return glass
}