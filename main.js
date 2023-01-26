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


const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.shadowMapEnabled = true;



const aspect = 2; // the canvas default
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.y = 1;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var controls = new THREE.TrackballControls(camera, canvas);
controls.rotateSpeed = 2;
controls.noZoom = false;
controls.zoomSpeed = 1.2;
controls.staticMoving = true;



const scene = new THREE.Scene();

// свет
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    light.castShadow = true;
    scene.add(light);

    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(1, 2, -4);
    light2.castShadow = true;
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(color, intensity);
    light3.position.set(1, -2, 4);
    light3.castShadow = true;
    scene.add(light3);
}

// стол
var table; {
    const table_geometry = new THREE.BoxGeometry(5, 3, 3);
    // Для новых версий ThreeJS
    // const loader = new THREE.TextureLoader();
    // const table_material = new THREE.MeshBasicMaterial({
    //     map: loader.load('wood-table.jpg'),
    // });

    // Загрузка текстур для старых версий ThreeJS
    var table_material = new THREE.MeshLambertMaterial({
        map: new THREE.ImageUtils.loadTexture('tex/wood-table.jpg')
    });


    table = new THREE.Mesh(table_geometry, table_material);
    table.position.y = -2.5;
    table.castShadow = true;
    table.receiveShadow = true;
    scene.add(table);
}


// кофемашина
var cubes = []; {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(

        // передняя нижняя панель
        new THREE.Vector3(-1, -1, 1.5), // 0
        new THREE.Vector3(-1, -0.75, 1.5), // 1
        new THREE.Vector3(1, -0.75, 1.5), // 2
        new THREE.Vector3(1, -1, 1.5), // 3

        // задние нижние точки
        new THREE.Vector3(-1, -1, -1), // 4
        new THREE.Vector3(1, -1, -1), // 5

        // нижние вспомогательные точки для выемки 
        new THREE.Vector3(-1, -1, 1), // 6
        new THREE.Vector3(1, -1, 1), // 7

        new THREE.Vector3(-1, -0.75, 1), // 8
        new THREE.Vector3(1, -0.75, 1), // 9

        // передняя верхняя панель
        new THREE.Vector3(-1, 1, 1.5), // 10
        new THREE.Vector3(1, 1, 1.5), // 11

        new THREE.Vector3(-1, 0.5, 1.5), // 12
        new THREE.Vector3(1, 0.5, 1.5), // 13

        // задние верхние точки
        new THREE.Vector3(-1, 1, -1), // 14
        new THREE.Vector3(1, 1, -1), // 15

        //Доп точки верхней панель
        new THREE.Vector3(-1, 1, 1), // 16
        new THREE.Vector3(1, 1, 1), // 17
        new THREE.Vector3(-1, 0.5, 1), // 18
        new THREE.Vector3(1, 0.5, 1), // 19


    );


    geometry.faces.push(

        // передняя нижняя панель
        new THREE.Face3(2, 1, 0),
        new THREE.Face3(0, 3, 2),

        //дно
        new THREE.Face3(5, 0, 4),
        new THREE.Face3(0, 5, 3),
        // конец дна

        new THREE.Face3(9, 1, 2),
        new THREE.Face3(9, 8, 1),

        new THREE.Face3(0, 1, 8),
        new THREE.Face3(9, 2, 3),
        new THREE.Face3(8, 6, 0),
        new THREE.Face3(3, 7, 9),

        // Передняя верхняя панель
        new THREE.Face3(12, 11, 10),
        new THREE.Face3(12, 13, 11),

        //между верхней и центральной панель
        new THREE.Face3(12, 18, 19),
        new THREE.Face3(19, 13, 12),

        // правая верхняя заплатка на выемку
        new THREE.Face3(11, 13, 19),
        new THREE.Face3(19, 15, 11),

        // левая верхняя заплатка на выемку
        new THREE.Face3(10, 16, 18),
        new THREE.Face3(10, 18, 12),

        // Передняя центральная панель
        new THREE.Face3(8, 9, 19),
        new THREE.Face3(8, 19, 18),

        // крышка
        new THREE.Face3(15, 14, 10),
        new THREE.Face3(15, 10, 11),

        // зад
        new THREE.Face3(4, 14, 15),
        new THREE.Face3(4, 15, 5),


        // слева
        new THREE.Face3(14, 4, 6),
        new THREE.Face3(6, 16, 14),

        // справа
        new THREE.Face3(7, 5, 15),
        new THREE.Face3(15, 17, 7),


    );

    geometry.computeFaceNormals();

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshLambertMaterial({
            color
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);

        cube.position.x = x;
        return cube;
    }

    cubes = [
        makeInstance(geometry, 0x4444FF, 0),
    ];
}

// наливайка
var pourer; {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.3);
    const material = new THREE.MeshLambertMaterial({
        color: 0x4444FF
    });
    pourer = new THREE.Mesh(geometry, material);
    pourer.position.y = 0.3;
    pourer.position.z = 1.25;
    pourer.castShadow = true;
    pourer.receiveShadow = true;
    scene.add(pourer);
}


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
        table.position.x -= 0.1;
    }
    if (Key.isDown(Key.D)) // движение вправо
    {
        table.position.x += 0.1;
    }
    if (Key.isDown(Key.W)) // движение вперёд
    {
        table.position.z -= 0.1;
    }
    if (Key.isDown(Key.S)) // движение назад
    {
        table.position.z += 0.1;
    }
    if (Key.isDown(Key.SPACE)) // подскок
    {
        table.position.y += 0.1;
    }
    if (Key.isDown(Key.Ctrl)) // подскок
    {
        table.position.y -= 0.1;
    }
}

function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        // cube.rotation.x = rot;
        // cube.rotation.x = rot;
    });

    dynamo();
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
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