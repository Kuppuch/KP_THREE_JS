function addParticles(scene) {
    let rad = 1.88;
    let deg = 0;
    var terrainSize = terrain.length;

    // Создание частиц
    var geometry = new THREE.SphereGeometry(0.1, 8, 8);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffdb8f
    });
    particles = [];
    for (var i = 0; i < terrainSize; i++) {
        for (var j = 0; j < terrainSize; j++) {
            var Psphere = new THREE.Mesh(geometry, material);
            Psphere.position.x = (i - terrainSize / 4) / 16 + (Math.random() - 0.5) * 8;
            Psphere.position.y = -1;
            Psphere.position.z = ((j - terrainSize / 4) / 16 + (Math.random() - 0.5) * 8) + 5;
            deg++;
            if (Math.pow(Psphere.position.x - 0, 2) + Math.pow(Psphere.position.z - 2, 2) <= Math.pow(rad, 2)) {
                scene.add(Psphere)
            }
        }
    }
}