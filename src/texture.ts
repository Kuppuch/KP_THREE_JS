import * as THREE from 'three'

export const initializeTextureLoader = (): THREE.TextureLoader => {
  return new THREE.TextureLoader()
}

export const textureLoader = initializeTextureLoader()
