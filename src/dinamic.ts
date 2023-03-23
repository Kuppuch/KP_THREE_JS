const step: number = 0.1
export const dynamo = (Key: any, glass: THREE.Object3D, water: THREE.Object3D) => {
  if (Key.isDown(Key.A) && checkCollision(glass, 'A')) // движение влево
  {
    glass.position.x -= step
    water.position.x -= step
  }
  if (Key.isDown(Key.D) && checkCollision(glass, 'D')) // движение вправо
  {
    glass.position.x += step
    water.position.x += step
  }
  if (Key.isDown(Key.W) && checkCollision(glass, 'W')) // движение вперёд
  {
    glass.position.z -= step
    water.position.z -= step
  }
  if (Key.isDown(Key.S) && checkCollision(glass, 'S')) // движение назад
  {
    glass.position.z += step
    water.position.z += step
  }
  if (Key.isDown(Key.SPACE)) {
    glass.position.y += step
    water.position.y += step
  }
  if (Key.isDown(Key.Ctrl)) {
    glass.position.y -= step
    glass.position.y -= step
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