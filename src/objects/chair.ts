import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Scene} from "three/src/Three";


export const chair = (
  scene: Scene
) => {
  const loader = new GLTFLoader();
  loader.load('assets/chair.glb', function (gltf) {


    const sx: number = 10
    const sy: number = 10
    const sz: number = 10

    const px: number = -215
    const py: number = -35
    const pz: number = 65

    let ry: number = -45



    for (let i = 0; i < 20; i++) {
      let pzOffset: number = 0
      let ryOffset: number = 0

      let pxOffestRow2: number = 0
      let pzOffestRow2: number = 0

      if (i % 2 == 1) {
        ryOffset = -135
        pzOffset = 65
      }

      if (i > 9) {
        pxOffestRow2 = 365
        pzOffestRow2 = 80
      }

      const chair = gltf.scene.clone()
      chair.scale.set(sx, sy, sz)
      chair.position.set(px + i * 40 - pxOffestRow2, py, pz + pzOffset + pzOffestRow2)
      chair.rotateY(ry + ryOffset)

      scene.add(chair)

    }


  }, undefined, function (error) {
    console.error(error)
  })
}