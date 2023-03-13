import * as THREE from 'three'
import { textureLoader } from '../texture'

export type BarTableResult = {
  table: THREE.Mesh,
  topTable: THREE.Mesh,
}

export const barTable = (): BarTableResult => {
  const geometry = new THREE.BoxGeometry(350, 30, 30)
  // Для новых версий ThreeJS
  let texture = textureLoader.load('assets/wood-table.jpg')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(6, 1)
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.FrontSide
  })

  const table = new THREE.Mesh(geometry, material)
  table.position.y = -30
  table.position.x = -75
  table.castShadow = true
  table.receiveShadow = true

  // Загрузка текстур для старых версий ThreeJS
  // const table_material = new THREE.MeshLambertMaterial({
  //     map: new THREE.ImageUtils.loadTexture('tex/wood-table.jpg')
  // })

  texture = textureLoader.load('assets/marble.png')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(6, 1)

  const topMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.FrontSide
  })

  const topGeometry = new THREE.BoxGeometry(360, 5, 40)
  const topTable = new THREE.Mesh(topGeometry, topMaterial)
  topTable.position.y = -12.5
  topTable.position.x = -75
  topTable.castShadow = true
  topTable.receiveShadow = true

  return {
    table,
    topTable,
  }
}