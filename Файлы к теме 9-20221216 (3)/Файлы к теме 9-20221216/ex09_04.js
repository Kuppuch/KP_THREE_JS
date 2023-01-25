// ���������� ����������
var container, camera, controls, scene, renderer, light;
var Cube;

// �������� �������� ����� ������ �������� ��������
window.onload = function () {
    init();
    animate();
}

function init() {
    scene = new THREE.Scene(); //������� ����� 
    AddCamera(50, 300, 1200); //��������� ������
    AddLight(0, 0, 500); //������������� ����� ����

    //������� ��������
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById('MyWebGLApp');
    container.appendChild(renderer.domElement);

    //��������� �����
    var geometry = new THREE.SphereGeometry(100, 50, 50);
    var material = new THREE.MeshLambertMaterial({
        color: 0x33CCFF
    });
    var Sphere1 = new THREE.Mesh(geometry, material);
    Sphere1.position.x = 80;
    Sphere1.position.y = 20;
    Sphere1.position.z = 100;
    Sphere1.scale.x = 0.5;
    scene.add(Sphere1);

    //      ��������� ��� ������������
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        // ������ ������� �������
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        // ����� ������� �������
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }),
        //���� �����
        new THREE.MeshBasicMaterial({
            color: 0xff00ff
        }),
        // ��� ���������
        new THREE.MeshBasicMaterial({
            color: 0xffff00
        }),
        // ������� ������� ������ 
        new THREE.MeshBasicMaterial({
            color: 0x00ffff
        })
        // ������ ������� ����� ����
    ];

    var material = new THREE.MeshFaceMaterial(materials);
    var geometry = new THREE.BoxGeometry(100, 150, 200);
    Cube = new THREE.Mesh(geometry, material);
    Cube.position.z = 100;
    Cube.position.x = 250;
    //Cube.rotation.z = Math.PI / 6; 
    Cube.rotation.y = -Math.PI / 6;
    scene.add(Cube);

    // ����������� ��������
    // �������� ���������
    var radius_top = 0;
    var radius_bottom = 128;
    var heigth = 240;
    var segments = 3;
    var geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, heigth, segments);
    var material = new THREE.MeshNormalMaterial({
        color: 0xf2ddc6
    });
    var piramida = new THREE.Mesh(geometry, material);
    piramida.position.set(-80, 0, 100);
    scene.add(piramida);

    // ����������� ������
    // �������� ���������
    var radius_top = 128;
    var radius_bottom = 128;
    var heigth = 240;
    var segments = 3;
    var geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, heigth, segments);
    var material = new THREE.MeshNormalMaterial({
        color: 0xf2ddc6
    });
    var piramida = new THREE.Mesh(geometry, material);
    piramida.position.set(-300, 0, 100);
    scene.add(piramida);

    // �������:
    var radius_top = 128;
    var radius_bottom = 128;
    var heigth = 240;
    var segments = 16;
    var geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, heigth, segments);
    var material = new THREE.MeshNormalMaterial({
        color: 0xf2ddc6
    });
    var piramida = new THREE.Mesh(geometry, material);
    piramida.position.set(-300, 300, 100);
    scene.add(piramida);

    // �����:
    var radius_top = 0;
    var radius_bottom = 128;
    var heigth = 240;
    var segments = 16;
    var geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, heigth, segments);
    var material = new THREE.MeshNormalMaterial({
        color: 0xf2ddc6
    });
    var piramida = new THREE.Mesh(geometry, material);
    piramida.position.set(-50, 300, 100);
    scene.add(piramida);

    // ��������� �����:
    var radius_top = 64;
    var radius_bottom = 128;
    var heigth = 240;
    var segments = 16;
    var geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, heigth, segments);
    var material = new THREE.MeshNormalMaterial({
        color: 0xf2ddc6
    });
    var piramida = new THREE.Mesh(geometry, material);
    piramida.position.set(200, 300, 100);
    scene.add(piramida);

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}

function AddCamera(X, Y, Z) {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(X, Y, Z);
    controls = new THREE.TrackballControls(camera, container);
    controls.rotateSpeed = 2;
    controls.noZoom = false;
    controls.zoomSpeed = 1.2;
    controls.staticMoving = true;
}

function AddLight(X, Y, Z) {
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(X, Y, Z);
    scene.add(light);
}