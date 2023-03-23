import * as THREE from 'three'

export const glassClipStart = -2.4
export const glassClipEnd = 0.7
export const glassClipStep = 0.1

export const getCoffeeGlassPoint = (
  percent: number,
  offsetX: number = 0,
): THREE.Vector2 => {
  const clipLength = glassClipEnd - glassClipStart

  const point = glassClipStart + clipLength * percent

  return new THREE.Vector2(1 + Math.exp(-point * point) + offsetX, 2 * point)
}

export const coffeeGlass = (): THREE.Object3D => {
  const glass = new THREE.Object3D

  const material_transparent = new THREE.MeshPhongMaterial({
    color: 0xEADAAF,
    specular: 0xEADAAF,
    shininess: 50,
    blending: THREE.NormalBlending,
    depthTest: true,
    depthWrite: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6
  })

  const material = new THREE.MeshPhongMaterial({
    color: 0xEADAAF,
    specular: 0xEADAAF,
    shininess: 50,
    blending: THREE.NormalBlending,
    depthTest: true,
    depthWrite: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1
  })

  const points = []

  for (let i = 0; i < 1; i += 0.01) {
    points.push(
      getCoffeeGlassPoint(i)
    )
  }

  const geometry1 = new THREE.LatheGeometry(points, 32)
  const object = new THREE.Mesh(geometry1, material_transparent)
  object.position.set(0, 6.3, 0)
  glass.add(object)

  const geometry = new THREE.CylinderGeometry(1, 2, 1, 32)
  const disc1 = new THREE.Mesh(geometry, material)

  disc1.position.set(0, 1, 0)
  glass.add(disc1)

  glass.position.set(0, -7.5, 2)

  return glass
}
