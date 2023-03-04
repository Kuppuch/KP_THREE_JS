import * as THREE from 'three'
import { textureLoader } from '../texture'

export const walls = (): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(500, 120, 300)

  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('assets/wall.jpg'),
    side: THREE.BackSide,
  })

  const room = new THREE.Mesh(geometry, material)

  room.position.y = 19.9
  room.position.z = 70
  // room.castShadow = true
  room.receiveShadow = true

  return room
}
