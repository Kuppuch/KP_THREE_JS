

var scene, camera, renderer, obj1, obj2, obj3, obj4;
init();
animate();
function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800,600);
    document.body.appendChild( renderer.domElement );
     
    camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
    camera.translateZ(180);
 
    scene = new THREE.Scene();
 
    var obj_material=new THREE.MeshPhongMaterial( { color: 0xff6666, side: THREE.DoubleSide } );
    var obj_geometry = new THREE.Geometry();
	obj_geometry.vertices = [
		new THREE.Vector3(-30,30,10), new THREE.Vector3(30,30,10),
		new THREE.Vector3(-30,20,0), new THREE.Vector3(30,20,0),
		new THREE.Vector3(-30,10,-10), new THREE.Vector3(30,10,-10),
		new THREE.Vector3(-30,-10,-10), new THREE.Vector3(30,-10,-10),
		new THREE.Vector3(-30,-20,0), new THREE.Vector3(30,-20,0),
		new THREE.Vector3(-30,-30,10), new THREE.Vector3(30,-30,10)
	];
	obj_geometry.faces = [
		new THREE.Face3(0,3,1), new THREE.Face3(0,2,3),
		new THREE.Face3(2,5,3), new THREE.Face3(2,4,5),
		new THREE.Face3(4,7,5), new THREE.Face3(4,6,7),
		new THREE.Face3(6,9,7), new THREE.Face3(6,8,9),
		new THREE.Face3(8,11,9), new THREE.Face3(8,10,11)
	];
	obj1 = new THREE.Mesh( obj_geometry, obj_material );
	obj2 = new THREE.Mesh( obj_geometry.clone(), obj_material.clone() );
	obj3 = new THREE.Mesh( obj_geometry.clone(), obj_material.clone() );
	obj4 = new THREE.Mesh( obj_geometry.clone(), obj_material.clone() );
	obj1.position.set( -40, 40, 0);
	obj2.position.set( 40, 40, 0);
	obj3.position.set( -40, -40, 0);
	obj4.position.set( 40, -40, 0);


	obj2.geometry.computeFaceNormals();
	obj3.geometry.computeVertexNormals(false);
	obj4.geometry.computeVertexNormals(true);
	
    var light = new THREE.AmbientLight( 0x666666 );
    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );

    light1.position.set(100, 100, 100);
	light1.lookAt(new THREE.Vector3(  0, 0, 0 ));
     
    scene.add( light, light1, obj1, obj2, obj3, obj4 );
}
 
function animate(){
 	obj1.rotateY( Math.PI/180 );
	obj2.rotateY( Math.PI/180 );
	obj3.rotateY( Math.PI/180 );
	obj4.rotateY( Math.PI/180 );
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

