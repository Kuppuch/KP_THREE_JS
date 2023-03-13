import {
    coffeeParticles,
    ParticleSystem,
    ParticleSystemPoints
} from "./src/particles/coffeeParticles.js";

var Key = {
    _pressed: {},

    A: 65,
    W: 87,
    D: 68,
    S: 83,
    SPACE: 32,
    Ctrl: 17,

    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    }
}

var canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas
});
renderer.shadowMap.enabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;



const aspect = 2; // the canvas default
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.x = 0
camera.position.y = 10
camera.position.z = 75
camera.lookAt(new THREE.Vector3(0, 0, 0));

var controls = new THREE.TrackballControls(camera, canvas);
controls.rotateSpeed = 2;
controls.noZoom = false;
controls.zoomSpeed = 1.2;
controls.staticMoving = true;




const scene = new THREE.Scene()
let light
let pouringInProcess = false
let cp
const clock = new THREE.Clock()
let pouringPercent = 0

const {
    object: water,
    clipPlane: waterClipPlane,
    topSide: waterTopSide,
} = fillingGlass(0)


window.onload = (event) => {

    const pourButton = document.querySelector('#pour')
    control()

    scene.background = new THREE.Color(0x999999)

    light = addLight(-75, 100, 50)
    scene.add(light)
    light = addLight(-75, -100, 50)
    scene.add(light)

    let {
        top_table: topBarTable,
        table: barTable
    } = addBarTable()

    sceneBuild(scene, [
        setBarLight(10),
        addWall(),
        addFlor(),
        addRoof(),
        barTable,
        topBarTable,
        addCoffeeMachine(),
        addPourer(),
        water,
        addGlass(),
        addTable(10),
        addWindow()
    ])

    cp = new coffeeParticles(scene)


    pourButton.addEventListener('click', () => {
        if (!pouringInProcess) {
            let foam = scene.getObjectByName("foam");
            scene.remove(foam)
            pouringPercent = 0
            pouringInProcess = true
            cp.init()
        } else {
            pouringInProcess = false
            cp.destruct()
        }
    })

    requestAnimationFrame(render)
};


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width - 20, height, false);
    }
    return needResize;
}

function dynamo() {
    if (Key.isDown(Key.A)) // движение влево
    {
        light.position.x -= 0.1;
    }
    if (Key.isDown(Key.D)) // движение вправо
    {
        light.position.x += 0.1;
    }
    if (Key.isDown(Key.W)) // движение вперёд
    {
        light.position.z -= 0.1;
    }
    if (Key.isDown(Key.S)) // движение назад
    {
        light.position.z += 0.1;
    }
    if (Key.isDown(Key.SPACE)) // подскок
    {
        light.position.y += 0.1;
    }
    if (Key.isDown(Key.Ctrl))
    {
        light.position.y -= 0.1;
    }
}

function render(time) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    if (pouringInProcess) {
        coffeeAnimateCalc()
    }

    dynamo()
    controls.update()

    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

function coffeeAnimateCalc() {
    const delta = clock.getDelta()
    pouringPercent += 0.1 * delta

    cp.animate(delta)

    if (pouringPercent > 0.8) {
        scene.add(addParticles())
        pouringInProcess = false
        cp.destruct()
    }

    waterClipPlane.constant = getClipPlanePosition(pouringPercent)
    const scale = getCoffeeGlassPoint(pouringPercent - 0.01).x - 0.09 // radius
    waterTopSide.scale.set(scale, scale, 1)
    waterTopSide.position.y = getClipPosition(pouringPercent) // world coffee water top position
}



window.addEventListener('keyup', function (event) {
        Key.onKeyup(event)
    },
    false
);

window.addEventListener('keydown', function (event) {
        Key.onKeydown(event)
    },
    false
);