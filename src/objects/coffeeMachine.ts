import * as THREE from 'three'
import { coffeeMachineMesh } from '../mesh/coffeeMachineMesh'

export const coffeeMachine = (): THREE.Mesh => {
  const geometry = new THREE.BufferGeometry()

  // itemSize = 3 (т.к. 3 компоненты на вертекс)
  geometry.setAttribute('position', new THREE.BufferAttribute(coffeeMachineMesh, 3))
  geometry.computeVertexNormals()

  const material = new THREE.MeshLambertMaterial({
    color: 0x4444FF,
    side: THREE.FrontSide,
  })

  const machine = new THREE.Mesh(geometry, material)
  machine.castShadow = true
  machine.receiveShadow = true

  return machine
}
