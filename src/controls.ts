import * as THREE from 'three'
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";

export const initializeControls = (
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
): TrackballControls => {
  const controls = new TrackballControls(camera, canvas)
  controls.rotateSpeed = 2
  controls.noZoom = false
  controls.zoomSpeed = 1.2
  controls.staticMoving = true
  return controls
}