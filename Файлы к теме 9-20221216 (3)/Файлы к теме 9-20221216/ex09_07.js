// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var Cube;
var Snowman = new THREE.Object3D();

// начинаем рисовать после полной загрузки страницы
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //создаем сцену 
AddCamera( 0, 300, 500); //добавляем камеру
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

//добавляем куб
//var geometry = new THREE.BoxGeometry( 200, 100, 150); 
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
//Cube = new THREE.Mesh( geometry, material );
//Cube.position.z = -100;
//Cube.rotation.z = Math.PI / 6; 
//scene.add( Cube );

// Снеговик
var material = new THREE.MeshBasicMaterial( {color: 0x33CCFF} );
var geometry = new THREE.SphereGeometry( 60, 36, 36 );
var sphere1 = new THREE.Mesh( geometry, material);
sphere1.position.set( 0, 60, 0 );
Snowman.add( sphere1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00edff} ); 
var geometry = new THREE.SphereGeometry( 44, 36, 361 ); 
var sphere2 = new THREE.Mesh( geometry, material); 
sphere2.position.set( 0, 140, 0 );
Snowman.add( sphere2 );
var material = new THREE.MeshBasicMaterial( {color: 0xafeeee} ); 
var geometry = new THREE.SphereGeometry( 32, 36, 36 ); 
var sphere3 = new THREE.Mesh( geometry, material); 
sphere3.position.set( 0, 206, 0 );
Snowman.add( sphere3 );
var material=new THREE.MeshBasicMaterial({color:0x1560bd}); 
var geometry = new THREE.SphereGeometry( 16, 16, 16 ); 
var sphere4 = new THREE.Mesh( geometry, material); 
sphere4.position.set( -50, 156, 0 );
Snowman.add( sphere4 );
sphere5 = sphere4.clone(); 
sphere5.position.set( 50, 156, 0 );
Snowman.add( sphere5 );

//конус:
var material = new THREE.MeshLambertMaterial({color: 0xf36223}); 
var geometry = new THREE.CylinderGeometry( 1,7, 40, 8 ); 
var nose = new THREE.Mesh( geometry, material); 
nose.position.set(0, 202, 45); 
nose.rotation.x = Math.PI/2; 
Snowman.add( nose );
//ведро:
var material = new THREE.MeshLambertMaterial({color: 0x6600ff}); 
var geometry = new THREE.CylinderGeometry( 24, 34, 60, 18 );
var bucket = new THREE.Mesh( geometry, material); 
bucket.position.set(0, 249, -12); 
bucket.rotation.x = -Math.PI/11; 
Snowman.add( bucket );
//Два глаза
var material = new THREE.MeshLambertMaterial({color: 0x000000}); 
var geometry = new THREE.SphereGeometry( 5, 50, 11 ); 
var eye1 = new THREE.Mesh( geometry, material); 
eye1.position.set( -15, 213, 27 );
Snowman.add( eye1 );
var eye2 = eye1 .clone(); eye2.position.set( 15, 213, 27 );
Snowman.add( eye2 );
// рот:
var material = new THREE.MeshBasicMaterial({color: 0x560319}); 
var geometry = new THREE.CircleGeometry( 10, 10, 0, Math.PI ); 
var mouth = new THREE.Mesh( geometry, material); 
mouth.rotation.z = Math.PI; 
mouth.position.set( 0, 194, 27 );
Snowman.add( mouth );
Snowman.position.set( 0, -100, 0 ); 
scene.add( Snowman );

}

function animate()
{
requestAnimationFrame(animate);
render();
}
 
function render()
{
Snowman.position.z+= 0.5;
//Cube.position.x = Cube.position.x + 1; //куб движется 
//Cube.rotation.y = Cube.rotation.y + 0.01; //и вращается вокруг оси 
controls.update(); 
renderer.render(scene, camera);
}

function AddCamera(X,Y,Z) 
{
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(X,Y,Z);
// camera.lookAt(new THREE.Vector3(10,-100,100));
// camera.lookAt (object.position);
// camera.updateProjectionMatrix();
controls = new THREE.TrackballControls( camera, container );
controls.rotateSpeed = 2; 
controls.noZoom = false; 
controls.zoomSpeed = 1.2; 
controls.staticMoving = true;
}

function AddLight(X,Y,Z)
{
light = new THREE.DirectionalLight( 0xffffff );
light.position.set(X,Y,Z);
scene.add( light );
}
