import * as THREE from 'three'
import { textureLoader } from '../texture'

export const floor = (): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(500, 300)

  const texture = textureLoader.load('assets/floor.jpg')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(6, 3)

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  })

  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = Math.PI / 2
  plane.position.y = -40
  plane.position.z = 70

  return plane
}
