function fillingGlass() {
    
    let fillingPercent = 0.8
    const water = new THREE.Object3D

    water.position.set(0, -7.5, 2)

    const clipPlane = new THREE.Plane(
        water.up.multiplyScalar(-1),
        getClipPlanePosition(fillingPercent),
    )

    const material = new THREE.MeshPhongMaterial({
        clippingPlanes: [clipPlane],
        clipShadows: true,
        color: 0x5A4637,
        specular: 0xEADAAF,
        shininess: 100,
        blending: THREE.NormalBlending,
        depthTest: true,
        depthWrite: true,
        side: THREE.FrontSide,
    })

    const points = []

    for (let i = 0; i < 1; i += 0.01) {
        points.push(
            getCoffeeGlassPoint(i, -0.1)
        )
    }

    const baseGeometry = new THREE.LatheGeometry(points, 32)
    const base = new THREE.Mesh(baseGeometry, material)
    base.position.set(0, 6.3, 0)

    const topSideGeometry = new THREE.CircleGeometry(1, 32)
    const topSide = new THREE.Mesh(topSideGeometry, material)

    const scale = getCoffeeGlassPoint(fillingPercent - 0.01).x
    topSide.scale.set(scale, scale, 1)
    topSide.position.set(0, getClipPosition(fillingPercent), 0)
    topSide.rotation.set(-Math.PI / 2, 0, 0)

    water.add(base)
    water.add(topSide)

    return {
        object: water,
        clipPlane,
        topSideGeometry,
        topSide
    }
}

const coffeeWaterHeight = 6

function getClipPosition(percent) {
    return 1.499 + coffeeWaterHeight * percent
}

function getClipPlanePosition(percent) {
    return -coffeeWaterHeight * (1 - percent)
}