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

    const px: number = -210
    const py: number = -35
    const pz: number = 60

    const ry: number = 45


    for (let i = 0; i < 20; i++) {
      const chair = gltf.scene
      chair.scale.set(sx, sy, sz)
      chair.position.set(px + i, py, pz)
      chair.rotateY(ry)

      scene.add(chair)

    }


  }, undefined, function (error) {
    console.error(error)
  })
}