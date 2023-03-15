import * as THREE from 'three'
import { textureLoader } from '../texture'

export const ceil = (): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(500, 300)

  const texture = textureLoader.load('assets/ceil.jpg')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(16, 8)

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.FrontSide
  })

  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = Math.PI / 2
  plane.position.y = 79.8
  plane.position.z = 70

  return plane
}
