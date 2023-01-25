// глобальные переменные
var container, camera, controls, scene, renderer, light; 

// начинаем рисовать после полной загрузки страницы
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //создаем сцену 
AddCamera( 1000, 1000, 1000); //добавляем камеру
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );


var axes = new THREE.AxisHelper(300); 
axes.position.set( 0,0,0 ); 
scene.add(axes);

var gridXZ = new THREE.GridHelper(100, 20); 
gridXZ.setColors( new THREE.Color(0x006600),
new THREE.Color(0x006600) ); 
gridXZ.position.set( 100,0,100 ); 
scene.add(gridXZ);

var gridXY = new THREE.GridHelper(100, 20);
gridXY.position.set( 100,100,0 ); 
gridXY.rotation.x = Math.PI/2; 
gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
scene.add(gridXY);

var gridYZ = new THREE.GridHelper(100, 20); 
gridYZ.position.set( 0,100,100 ); 
gridYZ.rotation.z = Math.PI/2; 
gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
scene.add(gridYZ);

}

function animate()
{
requestAnimationFrame(animate);
render();
}
 
function render()
{
controls.update(); 
renderer.render(scene, camera);
}

function AddCamera(X,Y,Z) 
{
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(X,Y,Z);
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
