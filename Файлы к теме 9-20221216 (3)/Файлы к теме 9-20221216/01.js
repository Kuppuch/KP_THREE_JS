var container, scene, camera, renderer, controls, sphere, cylinder, tube, piramida, piramida_clone, piramida_merge,
mbox, msphere, singleGeometry, mboxMesh, msphereMesh, mmaterial, mmesh, bb_murshrum1;

window.onload = function () {
    init();
    animate();
}

function init() {
    scene = new THREE.Scene();
    AddCamera(70, 100, 300);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(600, 600);
    container = document.getElementById('MyWebGLApp');
    container.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);

    // camera = new THREE.PerspectiveCamera(70, 600 / 600, 1, 1000);
    // camera.translateZ(150);

    var obj_material = [
        new THREE.MeshLambertMaterial({
            wireframe: false,
            side: THREE.BackSide,
            color: 0xffffff,
            emissive: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            side: THREE.DoubleSide,
            color: 0x444444
        })
    ];
    //var obj_material = new THREE.MeshLambertMaterial( { color: 0x00ff40 } );

    var piramida_geometry = new THREE.CylinderGeometry(0, 20, 40, 16);
    piramida = new THREE.SceneUtils.createMultiMaterialObject(piramida_geometry, obj_material);
    piramida.position.set(0, 20, 0);

    piramida_clone = piramida.clone();
    piramida_clone.position.set(0, 20, 50);

    var sphere_geometry = new THREE.SphereGeometry(20, 16, 16, Math.PI, 2 * Math.PI, Math.PI, Math.PI);
    sphere = new THREE.SceneUtils.createMultiMaterialObject(sphere_geometry, obj_material);
    sphere.position.set(70, 20, 0);

    var CustomSinCurve = THREE.Curve.create(
        function (scale) {
            this.scale = scale;
        },
        function (t) {
            var tx = Math.cos(8 * Math.PI * t),
                ty = Math.sin(8 * Math.PI * t),
                tz = t * 4;
            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
    );
    var path = new CustomSinCurve(10);
    var tube_geometry = new THREE.TubeGeometry(path, 80, 2, 8, false);
    tube = THREE.SceneUtils.createMultiMaterialObject(tube_geometry, obj_material);
    tube.position.set(130, 10, 0);

    bb_murshrum1 = new THREE.BoundingBoxHelper( tube, 0xff0000 );

    

    mbox = new THREE.BoxGeometry(7, 20, 7);
    msphere = new THREE.SphereGeometry(7, 32, 32);

    singleGeometry = new THREE.Geometry();

    mboxMesh = new THREE.Mesh(mbox);
    msphereMesh = new THREE.Mesh(msphere);

    mboxMesh.updateMatrix();
    singleGeometry.merge(mboxMesh.geometry, mboxMesh.matrix);

    msphereMesh.updateMatrix();
    singleGeometry.merge(msphereMesh.geometry, msphereMesh.matrix);

    mmaterial = new THREE.MeshPhongMaterial({color: 0xFF0000});
    mmesh = THREE.SceneUtils.createMultiMaterialObject(singleGeometry, obj_material);
    mmesh.position.set(70, 80, 250);





    var light = new THREE.AmbientLight(0x999999);
    //var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    //light1.position.set(100, 100, 100);
    //light1.lookAt(new THREE.Vector3(0, 0, 0));

    var axes = new THREE.AxisHelper(300);
    axes.position.set(0, 0, 0);

    var gridXZ = new THREE.GridHelper(100, 20);
    gridXZ.setColors(new THREE.Color(0x006600),
        new THREE.Color(0x006600));
    gridXZ.position.set(100, 0, 100);

    var gridXY = new THREE.GridHelper(100, 20);
    gridXY.position.set(100, 100, 0);
    gridXY.rotation.x = Math.PI / 2;
    gridXY.setColors(new THREE.Color(0x000066), new THREE.Color(0x000066));

    var gridYZ = new THREE.GridHelper(100, 20);
    gridYZ.position.set(0, 100, 100);
    gridYZ.rotation.z = Math.PI / 2;
    gridYZ.setColors(new THREE.Color(0x660000), new THREE.Color(0x660000));

    scene.add(light, sphere, tube, piramida, axes, gridXZ, gridXY, gridYZ, piramida_clone, mmesh, bb_murshrum1);
}

function animate() {
    piramida.rotateY(Math.PI / 360);
    sphere.rotateY(Math.PI / 360);
    tube.rotateZ(Math.PI / 360);

    bb_murshrum1.update();

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
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