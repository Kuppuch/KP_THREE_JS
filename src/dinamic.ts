import * as THREE from "three";

let moveObject = 'glass'
export let camTargetX: number = 0
export let camTargetY: number = 0
export let camTargetZ: number = 0

export const moveItem = () => {
  let moveChoice = document.querySelector('.move-choice')
  let radios = []
  radios.push(moveChoice.children[1].children[0])
  radios.push(moveChoice.children[2].children[0])
  for (let i = 0; i < radios.length; i++) {
    radios[i].onclick = function () {
      moveObject = radios[i].value
    }
  }
}

const step: number = 0.1

export const dynamo = (Key: any, glass: THREE.Object3D, water: THREE.Object3D, camera: THREE.PerspectiveCamera) => {

  if (Key.isDown(Key.A)) // движение влево
  {
    if (moveObject === 'glass') {
      if (checkCollision(glass, 'A')) {
        glass.position.x -= step
        water.position.x -= step
      }
    } else {
      camera.position.x -= step*10
      updateCameraTarget(camera, -step*10, 0, 0)
    }

  }
  if (Key.isDown(Key.D)) // движение вправо
  {
    if (moveObject === 'glass') {
      if (checkCollision(glass, 'D')) {
        glass.position.x += step
        water.position.x += step
      }
    } else {
      camera.position.x += step*10
      updateCameraTarget(camera, step*10, 0, 0)
    }
  }
  if (Key.isDown(Key.W)) // движение вперёд
  {
    if (moveObject === 'glass') {
      if (checkCollision(glass, 'W')) {
        glass.position.z -= step
        water.position.z -= step
      }
    } else {
      camera.position.z -= step*10
      updateCameraTarget(camera, 0, 0, -step*10)
    }
  }
  if (Key.isDown(Key.S)) // движение назад
  {
    if (moveObject === 'glass') {
      if (checkCollision(glass, 'S')) {
        glass.position.z += step
        water.position.z += step
      }
    } else {
      camera.position.z += step*10
      updateCameraTarget(camera, 0, 0, step*10)
    }
  }
  if (Key.isDown(Key.SPACE)) {
    if (moveObject === 'glass') {
      glass.position.y += step
      water.position.y += step
    } else {
      camera.position.y += step*10
    }
  }
  if (Key.isDown(Key.Ctrl)) {
    if (moveObject === 'glass') {
      glass.position.y -= step
      glass.position.y -= step
    } else {
      camera.position.y -= step*10
    }
  }
}

export const checkCollision = (glass: THREE.Object3D, direction: string): boolean => {
  //-8 < X < 8
  // 2 > Z > 3
  switch (direction) {
    case 'A':
      if (glass.position.x > -8) {
        return true
      }
      break
    case 'D':
      if (glass.position.x < 8) {
        return true
      }
      break
    case 'W':
      if (glass.position.z < 2) {
        return true
      }
      break
    case 'S':
      if (glass.position.z > 3) {
        return true
      }
      break
  }
  return false
}

export const updateCameraTarget = (camera: THREE.PerspectiveCamera, x: number, y: number, z: number) => {
  camTargetX += x
  camTargetY += y
  camTargetZ += z
  camera.lookAt(camTargetX, camTargetY, camTargetZ)
  console.log(camTargetX, camTargetY, camTargetZ)
}