import * as THREE from 'three'
// import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const initializeControls = (
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
): OrbitControls => {
  const controls = new OrbitControls(camera, canvas)
  controls.rotateSpeed = 0.5
  controls.zoomSpeed = 1.5
  return controls
}
