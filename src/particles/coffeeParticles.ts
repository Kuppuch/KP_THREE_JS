import * as THREE from 'three'
import { textureLoader } from '../texture'

export type ParticleSystemPoints = {
  positions: number[],
  colors: number[],
  sizes: number[],
}

export type ParticleSystem = {
  points: THREE.Points,
}

export const vertexShader = `
attribute float size;
varying vec3 vColor;

void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
}
`

export const fragmentShader = `
uniform sampler2D pointTexture;
varying vec3 vColor;

void main() {
    gl_FragColor = vec4( vColor, 1.0 );
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
}
`

export const coffeeParticles = (
  scene: THREE.Scene,
  particlesCount = 500,
  scatter = .6,
) => {
  let system: ParticleSystem|undefined

  const generatePoints = (count: number, scatter: number): ParticleSystemPoints => {
    const positions = []
    const colors = []
    const sizes = []

    for (let i = 0; i < count; i++) {
      positions.push((Math.random() * 2 - 1) * scatter)
      positions.push((Math.random() * 2 - 1) * scatter * 8)
      positions.push((Math.random() * 2 - 1) * scatter + 2)

      colors.push(0.6, 0.6, 0.4)

      sizes.push(0.2)
    }

    return {
      positions,
      colors,
      sizes,
    }
  }

  const init = () => {
    const {
      positions,
      colors,
      sizes,
    } = generatePoints(particlesCount, scatter)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: {
          value: textureLoader.load('assets/particle.png'),
        },
      },
      vertexShader,
      fragmentShader,

      // blending: THREE.AdditiveBlending,
      // depthTest: false,
      transparent: true,
      vertexColors: true,
    })

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage))

    const points = new THREE.Points(geometry, material)
    points.name = 'particle-system'

    system = {
      points,
    }

    scene.add(points)
  }

  const destruct = () => {
    if (!system) {
      return
    }

    const object = scene.getObjectByName(system.points.name)

    if (object) {
      scene.remove(object)
    }

    system = undefined
  }

  const click = () => {
    if (system) {
      destruct()
      return
    }

    init()
  }

  const animate = (delta: number) => {
    if (!system) {
      return
    }

    const positionsAttribute: THREE.Float32BufferAttribute = system.points.geometry
      .getAttribute('position') as THREE.Float32BufferAttribute

    for (let i = 0; i < particlesCount; i++) {
      let y = positionsAttribute.getY(i)
      y += -12 * delta

      if (y < -5) {
        y = 3
      }

      positionsAttribute.setY(i, y)
      positionsAttribute.needsUpdate = true
    }
  }

  return {
    click,
    destruct,
    animate,
    system,
  }
}
