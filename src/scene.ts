import * as THREE from 'three'

export const initializeScene = (): THREE.Scene => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x999999)

  return scene
}

export const buildScene = (
  scene: THREE.Scene,
  objects: THREE.Object3D[],
): void => {
  objects.forEach((object) => {
    scene.add(object)
  })
}
