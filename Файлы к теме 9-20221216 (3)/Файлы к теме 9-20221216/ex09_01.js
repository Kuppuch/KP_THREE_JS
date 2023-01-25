

var scene,camera,renderer,face;
init();
animate();
function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800,600);
    document.body.appendChild( renderer.domElement );
	
	camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
	camera.translateY(30);
	camera.translateZ(150);

	scene = new THREE.Scene();

	var face_material=new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
	var face_geometry = new THREE.Geometry();
	face_geometry.vertices = [ new THREE.Vector3(  0,  0, 0),
				new THREE.Vector3( 80,  0, 0),
				new THREE.Vector3(  0, 80, 0) ];
	face_geometry.faces.push( new THREE.Face3( 0, 1, 2 ));
	face_geometry.computeFaceNormals();
	console.log(face_geometry.faces[0].normal);
	face = new THREE.Mesh( face_geometry, face_material );
	
	var axisHelper_scene = new THREE.AxisHelper( 100 );
	var edges = new THREE.FaceNormalsHelper( face, 20, 0xFF0000, 1 );
	face.add( edges );
	
	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.PointLight( 0x666666, 1, 400 );
	light2.position.set(50,50,50);
	
	scene.add( light1, light2, face, axisHelper_scene );
}

function animate(){
	face.rotateY( Math.PI/180 );
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

