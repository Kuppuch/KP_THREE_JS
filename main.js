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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var controls = new THREE.TrackballControls(camera, canvas);
controls.rotateSpeed = 2;
controls.noZoom = false;
controls.zoomSpeed = 1.2;
controls.staticMoving = true;



const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);

// свет
{
    const color = 0xFFFFFF;
    const intensity = 1;
    var light = new THREE.DirectionalLight(color);
    light.position.set(-50, 10, 50);
    light.castShadow = true;
    scene.add(light);

    light.shadowMapSizeWidth = 512; // default
    light.shadowMapSizeHeight = 512; // default
    light.shadowCameraNear = 0.5; // default
    light.shadowCameraFar = 500; // default

    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 100, 0);
    // light.castShadow = true;
    // scene.add(light);

    // const light2 = new THREE.DirectionalLight(color, intensity);
    // light2.position.set(1, 2, -4);
    // light2.castShadow = true;
    // scene.add(light2);

    // const light3 = new THREE.DirectionalLight(color, intensity);
    // light3.position.set(1, -2, 4);
    // light3.castShadow = true;
    // scene.add(light3);
}

const loader = new THREE.TextureLoader();

// стены
{
    const room_geometry = new THREE.BoxGeometry(500, 120, 300);
    // Для новых версий ThreeJS
    const room_material = new THREE.MeshBasicMaterial({
        map: loader.load('tex/wall.jpg'),
        side: THREE.DoubleSide
    });

    var room = new THREE.Mesh(room_geometry, room_material);
    room.position.y = 19.9;
    room.position.z = 70;
    //room.castShadow = true;
    room.receiveShadow = true;
    scene.add(room);
}

// пол
{
    const flor_geometry = new THREE.PlaneGeometry(500, 300);
    const texture = loader.load('tex/Tiles074_1K-JPG/Tiles074_1K_Color.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 3);
    const flor_material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(flor_geometry, flor_material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -40;
    plane.position.z = 70;
    scene.add(plane);
}

// потолок
{
    const roof_geometry = new THREE.PlaneGeometry(500, 300);
    const texture = loader.load('tex/Planks023A_1K-JPG/Planks023A_1K_Color.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 8);
    const roof_material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const roof = new THREE.Mesh(roof_geometry, roof_material);
    roof.rotation.x = Math.PI / 2;
    roof.position.y = 79.8;
    roof.position.z = 70;
    scene.add(roof);
}


// стол
var table; {
    const table_geometry = new THREE.BoxGeometry(50, 30, 30);
    // Для новых версий ThreeJS
    const table_material = new THREE.MeshBasicMaterial({
        map: loader.load('tex/wood-table.jpg'),
        side: THREE.DoubleSide
    });

    // Загрузка текстур для старых версий ThreeJS
    // var table_material = new THREE.MeshLambertMaterial({
    //     map: new THREE.ImageUtils.loadTexture('tex/wood-table.jpg')
    // });


    table = new THREE.Mesh(table_geometry, table_material);
    table.position.y = -25;
    //table.castShadow = true;
    table.receiveShadow = true;
    scene.add(table);
}


// кофемашина
{
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        // левая грань
        -10, -10, -10,
        -10, 10, -10,
        -10, 10, 0,

        -10, -10, -10,
        -10, -10, 0,
        -10, 10, 0,

        -10, -10, 0,
        -10, -10, 5,
        -10, -7, 5,

        -10, -10, 0,
        -10, -7, 0,
        -10, -7, 5,

        -10, 10, 0,
        -10, 10, 5,
        -10, 5, 0,

        -10, 5, 0,
        -10, 5, 5,
        -10, 10, 5,

        // правая грань
        10, -10, -10,
        10, 10, -10,
        10, 10, 0,

        10, -10, -10,
        10, -10, 0,
        10, 10, 0,

        10, -10, 0,
        10, -10, 5,
        10, -7, 5,

        10, -10, 0,
        10, -7, 0,
        10, -7, 5,

        10, 10, 0,
        10, 10, 5,
        10, 5, 0,

        10, 5, 0,
        10, 5, 5,
        10, 10, 5,

        // передняя грань
        // низ
        -10, -10, 5,
        10, -10, 5,
        10, -7, 5,

        -10, -10, 5,
        -10, -7, 5,
        10, -7, 5,

        // верх
        -10, 10, 5,
        10, 10, 5,
        10, 5, 5,

        -10, 10, 5,
        -10, 5, 5,
        10, 5, 5,

        //центр
        -10, 5, 0,
        10, 5, 0,
        10, -7, 0,

        -10, 5, 0,
        -10, -7, 0,
        10, -7, 0,

        // вехняя планка
        -10, 5, 0,
        -10, 5, 5,
        10, 5, 0,

        10, 5, 0,
        10, 5, 5,
        -10, 5, 5,

        // нижняя планка
        -10, -7, 0,
        -10, -7, 5,
        10, -7, 0,

        10, -7, 0,
        10, -7, 5,
        -10, -7, 5,

        // зад
        -10, -10, -10,
        10, -10, -10,
        10, 10, -10,

        -10, -10, -10,
        -10, 10, -10,
        10, 10, -10,


        // крышка
        -10, 10, -10,
        -10, 10, 5,
        10, 10, 5,

        -10, 10, -10,
        10, 10, -10,
        10, 10, 5,

        // дно
        -10, -10, -10,
        -10, -10, 5,
        10, -10, 5,

        -10, -10, -10,
        10, -10, -10,
        10, -10, 5,

    ]);



    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({
        color: 0x4444FF,
        side: THREE.DoubleSide
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);


}

// наливайка
var pourer; {
    const geometry = new THREE.BoxGeometry(4, 3, 3);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
        roughness: 0,
        metalness: 1,
        normalScale: new THREE.Vector2(0, 0),
        displacementScale: 1
    });
    pourer = new THREE.Mesh(geometry, material);
    pourer.position.y = 3.5;
    pourer.position.z = 2;
    pourer.castShadow = true;
    pourer.receiveShadow = true;
    scene.add(pourer);
}

// фужер
{
    glass = new THREE.Object3D;
    var glass_material = new THREE.MeshPhongMaterial({
        color: 0xEADAAF,
        specular: 0xEADAAF,
        shininess: 50,
        blending: THREE.NormalBlending,
        depthTest: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });

    var j = 0;
    var points = [];
    for (var i = -2.4; i < 0.7; i = i + 0.1) {
        j = j + 2;
        points.push(new THREE.Vector3(1 + 1 * Math.exp(-i * i), 2 * i, 0));
    }

    var glass_geometry = new THREE.LatheGeometry(points, 32);
    object = new THREE.Mesh(glass_geometry, glass_material);
    object.position.set(0, 6.3, 0);
    glass.add(object);

    var geometry = new THREE.CylinderGeometry(1, 2, 1, 32);
    var disc1 = new THREE.Mesh(geometry, glass_material);
    disc1.position.set(0, 1, 0);
    glass.add(disc1);

    glass.position.set(0, -7.5, 2);
    scene.add(glass);
}


// Частицы
{
    let rad = 1.88;
    let deg = 0;
    var terrainSize = terrain.length;
    console.log(terrain.length);

    // Создание частиц
    var geometry = new THREE.SphereGeometry(0.1, 8, 8);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffdb8f
    });
    for (var i = 0; i < terrainSize; i++) {
        for (var j = 0; j < terrainSize; j++) {
            var Psphere = new THREE.Mesh(geometry, material);
            Psphere.position.x = (i - terrainSize / 4) / 16 + (Math.random() - 0.5) * 8;
            Psphere.position.y = -1;
            Psphere.position.z = ((j - terrainSize / 4) / 16 + (Math.random() - 0.5) * 8) + 5;
            deg++;
            if (Math.pow(Psphere.position.x - 0, 2) + Math.pow(Psphere.position.z - 2, 2) <= Math.pow(rad, 2)) {
                scene.add(Psphere);
            }
        }
    }

}


// var planeMaterial1 = new THREE.MeshLambertMaterial({
//     color: 0x9999ff,
//     side: THREE.DoubleSide
// });
// var planGeo1 = new THREE.PlaneGeometry(20, 20, 1, 1);
// var plane1 = new THREE.Mesh(planGeo1, planeMaterial1);
// plane1.rotation.x = Math.PI / 2;
// // plane1.receiveShadow = true;
// plane1.castShadow = true;
// scene.add(plane1);

// var planeMaterial2 = new THREE.MeshLambertMaterial({
//     color: 0xff00ff,
//     side: THREE.DoubleSide
// });
// var planGeo2 = new THREE.PlaneGeometry(30, 30, 1, 1);
// var plane2 = new THREE.Mesh(planGeo2, planeMaterial2);
// plane2.position.set(0, -10, 0);
// plane2.rotation.x = Math.PI / 2;
// plane2.receiveShadow = true;
// scene.add(plane2);


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

requestAnimationFrame(render);

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