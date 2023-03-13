import * as THREE from 'three'

export const light = (
  // position: THREE.Vector3 = new THREE.Vector3(-50, 10, 50),
  x: number =-50,
  y: number = 10,
  z: number = 50,
  color: THREE.ColorRepresentation = 0xFFFFFF,
  intensity: number = .8,
): THREE.SpotLight => {
  var light = new THREE.SpotLight(color, intensity)
  light.position.set(x, y, z)
  light.angle = 15
  //light.castShadow = true

  // light.shadowMapSizeWidth = 512
  // light.shadowMapSizeHeight = 512
  // light.shadowCameraNear = 0.5
  // light.shadowCameraFar = 500
  return light
}
