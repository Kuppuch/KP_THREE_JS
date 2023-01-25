var scene, camera, renderer, box, sphere1, sphere2, sphere3, sphere4, sphere5;
var direct=1;
var angle=0;
init();
animate();
function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( 800, 600 );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
	camera.translateX( 50 );
	camera.translateY( 70 );
	camera.translateZ( 200 );

	scene = new THREE.Scene();

	var sphere_material=new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
	var sphere_geometry = new THREE.SphereGeometry( 20, 18, 18 );
	sphere1 = new THREE.Mesh( sphere_geometry, sphere_material );
	
	sphere2 = new THREE.Mesh( sphere_geometry, sphere_material );
	sphere2.translateX( 50 );
	sphere1.add( sphere2 );
	
	sphere3 = new THREE.Mesh( sphere_geometry, sphere_material );
	sphere3.translateX( 50 );
	sphere2.add( sphere3 );

	sphere4 = new THREE.Mesh( sphere_geometry, sphere_material );
	sphere4.translateX( 50 );
	sphere3.add( sphere4 );
	
	sphere5 = new THREE.Mesh( sphere_geometry, sphere_material );
	sphere5.translateX( 50 );
	sphere4.add( sphere5 );

	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.PointLight( 0x666666, 1, 400 );
	light2.position.set( 200, 200, 50 );

	scene.add( sphere1 );
	scene.add( light1 );
	scene.add( light2 );

	console.log( scene.parent );
	console.log( scene.children );
	console.log("========================");
	console.log( sphere1.parent );
	console.log( sphere1.children );
	console.log("========================");
	console.log( sphere2.parent );
	console.log( sphere2.children );
	console.log("========================");
	console.log( sphere3.parent );
	console.log( sphere3.children );
	console.log("========================");
	console.log( sphere4.parent );
	console.log( sphere4.children );
	console.log("========================");
	console.log( sphere5.parent );
	console.log( sphere5.children );
}

function animate(){
	angle+=0.005*direct;
	sphere1.rotation.z=angle;
	sphere2.rotation.z=angle;
	sphere3.rotation.z=angle;
	sphere4.rotation.z=angle;
	sphere5.rotation.z=angle;
	if ( angle>1.25 || angle<0 ) direct*=-1;
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
