import * as THREE from 'three'

export const light = (
  color: THREE.ColorRepresentation = 0xFFFFFF,
  intensity: number = .8,
  position: THREE.Vector3 = new THREE.Vector3(-50, 10, 50),
): THREE.DirectionalLight => {
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(position.x, position.y, position.z)
  light.castShadow = true

  light.shadow.mapSize = new THREE.Vector2(512, 512)

  return light
}
