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

export const ParticleSystemPoints = {
    positions: [],
    colors: [],
    sizes: [],
}

export const ParticleSystem = {
    points: THREE.Points,
}

let system = ParticleSystem

export class coffeeParticles {
    scene = THREE.Scene
    particlesCount = 1000
    scatter = 0.6

    constructor(scene) {
        this.scene = scene
    }

    

    generatePoints(count, scatter) {
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
            sizes
        }
    }

    init() {
        const {
            positions,
            colors,
            sizes,
        } = this.generatePoints(this.particlesCount, this.scatter)

        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: {
                    value: new THREE.TextureLoader().load('tex/particle.png'),
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

        this.scene.add(points)
    }

    destruct() {
        if (!system) {
            return
        }

        const object = this.scene.getObjectByName(system.points.name)

        if (object) {
            this.scene.remove(object)
        }

        system = undefined
    }

    click() {
        if (system) {
            destruct()
            return
        }

        init()
    }

    animate(delta) {
        if (!system) {
            return
        }

        const positionsAttribute = system.points.geometry
            .getAttribute('position')

        for (let i = 0; i < this.particlesCount; i++) {
            let y = positionsAttribute.getY(i)
            y += -12 * delta

            if (y < -5) {
                y = 3
            }

            positionsAttribute.setY(i, y)
            positionsAttribute.needsUpdate = true
        }
    }
}