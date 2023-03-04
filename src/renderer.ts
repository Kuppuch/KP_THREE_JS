import * as THREE from 'three'

export const initializeRenderer = (canvas: HTMLCanvasElement): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
  })

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.localClippingEnabled = true

  return renderer
}
