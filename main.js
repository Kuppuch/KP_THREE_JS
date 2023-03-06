
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
    canvas
});
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;



const aspect = 2; // the canvas default
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.x = 0
camera.position.y = 1
camera.position.z = 25
camera.lookAt(new THREE.Vector3(0, 0, 0));

var controls = new THREE.TrackballControls(camera, canvas);
controls.rotateSpeed = 2;
controls.noZoom = false;
controls.zoomSpeed = 1.2;
controls.staticMoving = true;


const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
let light;


window.onload = (event) => {
    
    scene.background = new THREE.Color(0x999999);

    light = addLight()
    scene.add(light)

    scene.add(addWall());
    scene.add(addFlor());
    scene.add(addRoof());

    scene.add(addTable());


    scene.add(addCoffeeMachine());
    scene.add(addPourer());
    
    scene.add(addGlass());

    // Добавление частиц
    addParticles(scene);

    requestAnimationFrame(render);
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
    if (Key.isDown(Key.Ctrl)) // подскок
    {
        light.position.y -= 0.1;
    }
}

function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    dynamo();
    controls.update();
    if (positions.length > 0) {
        coffeeUpdate();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function coffeeUpdate() {
    let len = particleSystem.geometry.attributes.position.array.length
    for (let i = 1; i < len; i += 3) {
        particleSystem.geometry.attributes.position.array[i] -= 0.1;
        if (particleSystem.geometry.attributes.position.array[i] < -1) {
            particleSystem.geometry.attributes.position.array[i] = 3
        }
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
}



window.addEventListener('keyup', function (event) {
        Key.onKeyup(event);
    },
    false
);

window.addEventListener('keydown', function (event) {
        Key.onKeydown(event);
    },
    false
);