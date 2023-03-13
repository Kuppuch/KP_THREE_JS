import * as THREE from 'three'
import {textureLoader} from '../texture'

export const table = (
  count: number,
): THREE.Object3D[] => {
  let objects = []
  for (let i = 0; i < count; i++) {
    const object = new THREE.Object3D
    let geometry = new THREE.CylinderGeometry(5, 5, 24, 32)
    const material = new THREE.MeshLambertMaterial({
      color: 0x773300
    })
    let cylinder = new THREE.Mesh(geometry, material)
    cylinder.position.set(0, 0, 0)
    cylinder.castShadow = true
    cylinder.receiveShadow = true
    object.add(cylinder)

    geometry = new THREE.CylinderGeometry(30, 30, 2, 32)
    const material2 = new THREE.MeshLambertMaterial({
      map: textureLoader.load('assets/marble.png')
    })
    cylinder = new THREE.Mesh(geometry, material2)
    cylinder.position.set(0, 12, 0)
    cylinder.castShadow = true
    cylinder.receiveShadow = true
    object.add(cylinder)

    let offsetX = 0
    let offsetZ = 0
    if (i > 4) {
      offsetX = 360
      offsetZ = 80
    }

    object.position.set(-200 + 80 * i - offsetX, -28, 100 + offsetZ)
    objects.push(object)
  }

  return objects
}