import { initializeRenderer } from './renderer'
import { initializeCamera } from './camera'
import { initializeControls } from './controls'
import { buildScene, initializeScene } from './scene'
import { light } from './objects/light'
import { walls } from './objects/walls'
import { floor } from './objects/floor'
import { ceil } from './objects/ceil'
import { table } from './objects/table'
import { coffeeMachine } from './objects/coffeeMachine'
import { pourer } from './objects/pourer'
import { coffeeGlass, getCoffeeGlassPoint } from './objects/coffeeGlass'
import { getClipPlanePosition, getClipPosition, coffeeWater } from './objects/coffeeWater'
import * as THREE from 'three'
import {coffeeParticles} from "./particles/coffeeParticles";

export const init = (canvas: HTMLCanvasElement): void => {
  const container = document.querySelector('#app') as HTMLDivElement
  const pourButton = document.querySelector('#pour') as HTMLButtonElement

  console.log('INIT: Started')

  const renderer = initializeRenderer(canvas)
  renderer.setSize(container.clientWidth, container.clientHeight)

  const camera = initializeCamera()
  const controls = initializeControls(camera, canvas)

  const scene = initializeScene()

  console.log('INIT: Finished')

  console.log('SCENE: Building started')

  const {
    object: water,
    clipPlane: waterClipPlane,
    topSide: waterTopSide,
  } = coffeeWater(0)

  buildScene(scene, [
    light(),
    walls(),
    floor(),
    ceil(),
    table(),
    coffeeMachine(),
    pourer(),
    water,
    coffeeGlass(),
  ])

  const {
    click: startParticles,
    destruct: destructParticles,
    animate: animateParticles,
  } = coffeeParticles(scene)

  console.log('SCENE: Building finished')

  const clock = new THREE.Clock()
  let pouringPercent = 0

  let pouringInProcess = false

  pourButton.addEventListener('click', () => {
    if (!pouringInProcess) {
      pouringPercent = 0
      pouringInProcess = true
      startParticles()
    } else {
      pouringInProcess = false
      destructParticles()
    }
  })

  const render = () => {
    requestAnimationFrame(render)

    const delta = clock.getDelta()

    // TODO: move to function
    if (pouringInProcess) {
      pouringPercent += 0.1 * delta

      animateParticles(delta)

      if (pouringPercent > 0.7) {
        pouringPercent = 0.7
        pouringInProcess = false
        destructParticles()
      }

      waterClipPlane.constant = getClipPlanePosition(pouringPercent)
      const scale = getCoffeeGlassPoint(pouringPercent - 0.01).x - 0.01 // radius
      waterTopSide.scale.set(scale, scale, 1)
      waterTopSide.position.y = getClipPosition(pouringPercent) // world coffee water top position
    }

    controls.update()
    renderer.render(scene, camera)
  }

  renderer.setAnimationLoop(render)
  requestAnimationFrame(render)
}

addEventListener('load', () => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement

  init(canvas)
})
