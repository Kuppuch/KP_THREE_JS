

var scene, camera, renderer, murshrum1, bb_murshrum1, murshrum2, bb_murshrum2;

init();
animate();

function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800,600);
    document.body.appendChild( renderer.domElement );
     
    camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
    camera.translateZ(150);
 
    scene = new THREE.Scene();
 
    var murshrum_material = [ 
		new THREE.MeshPhongMaterial( { color: 0x723D16 } ),
	    new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ),
		new THREE.MeshPhongMaterial( { color: 0x666666 } )
	];
	
	var sphere_geometry = new THREE.SphereGeometry( 20, 16, 16, 0, Math.PI );
	var ring_geometry = new THREE.RingGeometry( 20, 10, 32, 1 );
	var cylinder_geometry = new THREE.CylinderGeometry( 10, 10, 40, 32, 1, true );
	var circle_geometry = new THREE.CircleGeometry( 10, 32);
	
	var murshrum1_geometry = new THREE.Geometry();
	murshrum1_geometry.merge( sphere_geometry, new THREE.Matrix4().set(
			1,                      0,                       0,  0,
			0, Math.cos( -Math.PI/2 ), -Math.sin( -Math.PI/2 ), 40,
			0, Math.sin( -Math.PI/2 ),  Math.cos( -Math.PI/2 ),  0,
			0,                      0,                       0,  1
	));
	murshrum1_geometry.merge( ring_geometry, new THREE.Matrix4().set(
			1,                      0,                       0,  0,
			0, Math.cos( -Math.PI/2 ), -Math.sin( -Math.PI/2 ), 40,
			0, Math.sin( -Math.PI/2 ),  Math.cos( -Math.PI/2 ),  0,
			0,                      0,                       0,  1
	), 1);
	murshrum1_geometry.merge( cylinder_geometry, new THREE.Matrix4().set(
			1, 0, 0,  0,
			0, 1, 0, 20,
			0, 0, 1,  0,
			0, 0, 0,  1
	), 2);
	murshrum1_geometry.merge( circle_geometry, new THREE.Matrix4().set(
			1,                      0,                     0, 0,
			0, Math.cos( Math.PI/2 ), -Math.sin( Math.PI/2 ), 0,
			0, Math.sin( Math.PI/2 ),  Math.cos( Math.PI/2 ), 0,
			0,                      0,                     0, 1
	), 2);

	console.log( "вершин до: " + murshrum1_geometry.vertices.length );
	murshrum1_geometry.mergeVertices();
	console.log( "вершин после: " + murshrum1_geometry.vertices.length );	
	murshrum1_geometry.computeBoundingBox();
	murshrum1 = new THREE.Mesh( murshrum1_geometry, new THREE.MeshFaceMaterial( murshrum_material ));
	var murshrum2_geometry = new THREE.Geometry();
	murshrum2_geometry.mergeMesh( murshrum1 );
	murshrum2 = new THREE.Mesh( murshrum2_geometry, new THREE.MeshFaceMaterial( murshrum_material ));
	murshrum2.geometry.center();
	murshrum1.translateX( -40 );
	murshrum2.translateX(  40 );
	
	bb_murshrum1 = new THREE.BoundingBoxHelper( murshrum1, 0xff0000 );
	bb_murshrum2 = new THREE.BoundingBoxHelper( murshrum2, 0xff0000 );
	var light = new THREE.AmbientLight( 0x666666 );
    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );

    light1.position.set(100, 100, 100);
	light1.lookAt(new THREE.Vector3(  0, 0, 0 ));
     
    scene.add( light, light1, murshrum1, bb_murshrum1, murshrum2, bb_murshrum2);
}
 
function animate(){
	murshrum1.rotateX( Math.PI/180 );
	bb_murshrum1.update();
	murshrum2.rotateX( Math.PI/180 );
	bb_murshrum2.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

