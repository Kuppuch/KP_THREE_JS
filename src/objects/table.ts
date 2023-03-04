import * as THREE from 'three'
import { textureLoader } from '../texture'

export const table = (): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(50, 30, 30)

  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('assets/wood-table.jpg'),
    side: THREE.FrontSide,
  })

  const table = new THREE.Mesh(geometry, material)
  table.position.y = -25
  // table.castShadow = true
  table.receiveShadow = true

  return table
}
