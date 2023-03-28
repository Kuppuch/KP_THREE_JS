import * as THREE from 'three'

export const spritef = () => {
  let objects = []
  const map = new THREE.TextureLoader().load('assets/bird.png')
  var runnerMaterial = new THREE.MeshBasicMaterial( { map: map, side:THREE.DoubleSide } );
  var runnerGeometry = new THREE.PlaneGeometry(50, 70, 1, 1);
  var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);

  let annie = new TextureAnimator(map, 12, 1, 12, 75)

  runner.position.set(-100,30, -79.5)
  objects.push(runner)
  const runner2 = runner.clone()
  runner2.position.x = 100
  objects.push(runner2)
  return {
    runner,
    runner2,
    annie,
  }
}

class TextureAnimator {

  tilesHorizontal
  tilesVertical
  numberOfTiles
  tileDisplayDuration
  currentDisplayTime
  currentTile
  texture

  constructor(texture: THREE.Texture, tilesHoriz: number, tilesVert: number, numTiles: number, tileDispDuration: number) {
    this.texture = texture
    this.tilesHorizontal = tilesHoriz
    this.tilesVertical = tilesVert
    this.numberOfTiles = numTiles
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)
    this.tileDisplayDuration = tileDispDuration
    this.currentDisplayTime = 0
    this.currentTile = 0
  }



  update(milliSec: number) {
    this.currentDisplayTime += milliSec
    while (this.currentDisplayTime > this.tileDisplayDuration) {
      this.currentDisplayTime -= this.tileDisplayDuration
      this.currentTile++
      if (this.currentTile == this.numberOfTiles)
        this.currentTile = 0
      var currentColumn = this.currentTile % this.tilesHorizontal
      this.texture.offset.x = currentColumn / this.tilesHorizontal
      var currentRow = Math.floor(this.currentTile / this.tilesHorizontal)
      this.texture.offset.y = currentRow / this.tilesVertical
    }
  }
}