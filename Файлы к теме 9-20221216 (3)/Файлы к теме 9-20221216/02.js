var container, scene, camera, renderer, controls, sphere, cylinder, tube, piramida, piramida_clone, piramida_merge,
    mbox, msphere, singleGeometry, mboxMesh, msphereMesh, mmaterial, mmesh, bb_murshrum1, icosahedron, prizma, sphere_clone;

window.onload = function () {
    init();
    animate();
}

function init() {
    scene = new THREE.Scene();
    AddCamera(70, 100, 300);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    container = document.getElementById('MyWebGLApp');
    container.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);

    // var obj_material = new THREE.MeshLambertMaterial( { color: 0x00ff40 } );
    // var obj_material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff });
    var obj_material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors
    });

    var sphere_geometry = new THREE.SphereGeometry(20, 16, 16, Math.PI, 2 * Math.PI, Math.PI, Math.PI);
    for (var i = 0; i < sphere_geometry.faces.length; i++) {
        sphere_geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }
    sphere = new THREE.Mesh(sphere_geometry, obj_material);
    sphere.position.set(70, 20, 0);
    sphere.geometry.computeFaceNormals();

    sphere_clone = sphere.clone();
    sphere_clone.position.set(70, 20, 50);

    var icosahedron_geometry = new THREE.IcosahedronGeometry(20, 0);
    for (var i = 0; i < icosahedron_geometry.faces.length; i++) {
        icosahedron_geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }
    icosahedron = new THREE.Mesh(icosahedron_geometry, obj_material);
    icosahedron.position.set(20, 20, 0);
    icosahedron.geometry.computeFaceNormals();


    const verticesOfCube = [
        -5, -5, -5, 5, -5, -5, 5, 5, -5, -5, 5, -5,
        -5, -5, 5, 5, -5, 5, 5, 5, 5, -5, 5, 5,
    ];

    const indicesOfFaces = [
        2, 1, 0, 0, 3, 2,
        0, 4, 7, 7, 3, 0,
        0, 1, 5, 5, 4, 0,
        1, 2, 6, 6, 5, 1,
        2, 3, 7, 7, 6, 2,
        4, 5, 6, 6, 7, 4
    ];

    var prizma_geometry = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 6, 1);
    for (var i = 0; i < prizma_geometry.faces.length; i++) {
        prizma_geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }
    prizma = new THREE.Mesh(prizma_geometry, obj_material);
    prizma.position.set(130, 10, 0);
    prizma.geometry.computeFaceNormals();
    prizma_geometry.computeBoundingSphere();
    //bb_murshrum1 = new THREE.BoundingBoxHelper( prizma, 0xff0000 );
    var center = new THREE.Vector3(130, 10, 0);

    let bsphere = prizma_geometry.computeBoundingSphere();
    let m = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        opacity: 0.3,
        transparent: true
    });
    var geometry = new THREE.SphereGeometry(bsphere.radius, 32, 32);
    let sMesh = new THREE.Mesh(geometry, m);
    scene.add(sMesh);



    mbox = new THREE.BoxGeometry(7, 20, 7);
    msphere = new THREE.SphereGeometry(7, 32, 32);

    singleGeometry = new THREE.Geometry();

    mboxMesh = new THREE.Mesh(mbox);
    msphereMesh = new THREE.Mesh(msphere);

    mboxMesh.updateMatrix();
    singleGeometry.merge(mboxMesh.geometry, mboxMesh.matrix);

    msphereMesh.updateMatrix();
    singleGeometry.merge(msphereMesh.geometry, msphereMesh.matrix);

    mmaterial = new THREE.MeshPhongMaterial({
        color: 0xFF0000
    });
    mmesh = THREE.SceneUtils.createMultiMaterialObject(singleGeometry, obj_material);
    mmesh.position.set(70, 80, 250);





    var light = new THREE.HemisphereLight(0x080820, 0xffffbb, 100);
    light.position.set(0, -10, 0);

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

    scene.add(light, sphere, prizma, icosahedron, axes, gridXZ, gridXY, gridYZ, mmesh, bb_murshrum1, sphere_clone);
}

function animate() {
    icosahedron.rotateY(Math.PI / 360);
    sphere.rotateY(Math.PI / 360);
    sphere_clone.rotateY(-Math.PI / 45);
    prizma.rotateZ(Math.PI / 360);

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