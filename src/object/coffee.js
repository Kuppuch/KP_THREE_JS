var timer = document.getElementById("timer");

let particleOffset = 0;
let particleSystem;
var positions = [];
let coffeeProcess = false;

function coffeeInit() {
    const particles = 5000;
    const radius = 0.5;
    geometryP = new THREE.BufferGeometry();


    const colors = [];
    const sizes = [];



    uniforms = {
        pointTexture: {
            value: new THREE.TextureLoader().load('tex/particle.png')
        }
    };

    const shaderMaterial = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,

        //blending: THREE.AdditiveBlending,
        //depthTest: false,
        transparent: true,
        vertexColors: true

    });

    const color = new THREE.Color();

    for (let i = 0; i < particles; i++) {

        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius * 5 + 1 - particleOffset);
        positions.push((Math.random() * 2 - 1) * radius + 2);

        color.setHSL(i / particles, 1.0, 0.5);

        colors.push(0.6, 0.6, 0.4);

        sizes.push(0.2);

    }

    geometryP.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometryP.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometryP.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));

    particleSystem = new THREE.Points(geometryP, shaderMaterial);
    particleSystem.name = "particleSystem";
}
