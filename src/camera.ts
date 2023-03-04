import * as THREE from 'three'

export const initializeCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
  camera.position.set(1, 1, 20)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  return camera
}
