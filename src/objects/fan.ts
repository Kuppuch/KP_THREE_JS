import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const loadFan = () => {
  const loader = new GLTFLoader()
  return loader.loadAsync('assets/fan.glb').then((result) => result.scene)
}

export const fanFrame = (): THREE.Mesh => {
  const points = []
  points.push(new THREE.Vector2(10, 10))
  points.push(new THREE.Vector2(10, 20))
  const material = new THREE.MeshLambertMaterial({
    color: 0x4444FF,
    side: THREE.DoubleSide,
  })
  const geometry = new THREE.LatheGeometry(points, 32)
  const object = new THREE.Mesh(geometry, material)
  object.rotateX(Math.PI / 2)
  object.position.set(0, 68, -90)

  return object
}