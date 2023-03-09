const glassClipStart = -2.4
const glassClipEnd = 0.7
const glassClipStep = 0.1

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
    for (var i = 0; i < 1; i = i + 0.1) {
        points.push(getCoffeeGlassPoint(i))
    }

    var glass_geometry = new THREE.LatheGeometry(points, 32)
    object = new THREE.Mesh(glass_geometry, glass_material)
    object.position.set(0, 6.3, 0)
    glass.add(object)

    var geometry = new THREE.CylinderGeometry(1, 2, 1, 32)
    var disc1 = new THREE.Mesh(geometry, glass_material)
    disc1.position.set(0, 1, 0)
    glass.add(disc1)

    glass.position.set(0, -7.5, 2)
    return glass
}

function getCoffeeGlassPoint(percent, offset = 0) {
    
    const clipLength = glassClipEnd - glassClipStart
    const point = glassClipStart + clipLength * percent
    return new THREE.Vector2(1 + Math.exp(-point * point) + offset, 2 * point)
}