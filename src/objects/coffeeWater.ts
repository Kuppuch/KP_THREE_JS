import * as THREE from 'three'
import { getCoffeeGlassPoint } from './coffeeGlass'

export const coffeeWaterHeight = 6

export const getClipPosition = (percent: number): number => (
  1.499 + coffeeWaterHeight * percent
)

export const getClipPlanePosition = (percent: number): number => (
  -coffeeWaterHeight * (1 - percent)
)

export type CoffeeWaterResult = {
  object: THREE.Object3D,
  clipPlane: THREE.Plane,
  topSideGeometry: THREE.CircleGeometry,
  topSide: THREE.Mesh,
}

export const coffeeWater = (
  fillingPercent: number = .8,
): CoffeeWaterResult => {
  const water = new THREE.Object3D

  water.position.set(0, -7.5, 2)

  const clipPlane = new THREE.Plane(
    water.up.multiplyScalar(-1),
    getClipPlanePosition(fillingPercent),
  )

  const material = new THREE.MeshPhongMaterial({
    clippingPlanes: [ clipPlane ],
    clipShadows: true,
    color: 0x5A4637,
    specular: 0xEADAAF,
    shininess: 100,
    blending: THREE.NormalBlending,
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide,
  })

  const points = []

  for (let i = 0; i < 1; i += 0.01) {
    points.push(
      getCoffeeGlassPoint(i, -0.1)
    )
  }

  const baseGeometry = new THREE.LatheGeometry(points, 32)
  const base = new THREE.Mesh(baseGeometry, material)
  base.position.set(0, 6.3, 0)

  const topSideGeometry = new THREE.CircleGeometry(1, 32)

  const topSide = new THREE.Mesh(topSideGeometry, material)
  const scale = getCoffeeGlassPoint(fillingPercent - 0.01).x
  topSide.scale.set(scale, scale, 1)
  topSide.position.set(0, getClipPosition(fillingPercent), 0)
  topSide.rotation.set(-Math.PI / 2, 0, 0)

  water.add(base)
  water.add(topSide)

  return {
    object: water,
    clipPlane,
    topSideGeometry,
    topSide,
  }
}
