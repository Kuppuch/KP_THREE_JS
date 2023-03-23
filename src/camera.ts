import * as THREE from 'three'

export const initializeCamera = (
  x: number = 1,
  y: number = 1,
  z: number = 20,
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
  camera.position.set(x, y, z)
  camera.lookAt(new THREE.Vector3(200, 0, 0))

  return camera
}
