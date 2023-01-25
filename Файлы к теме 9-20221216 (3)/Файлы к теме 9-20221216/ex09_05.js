var scene, camera, renderer, box, sphere, 
cylinder, dodecahedron, icosahedron, torus, 
torusknot, tube, parametric;

init();
animate();

function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600,600);
    document.body.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera( 70, 600 / 600, 1, 1000 );
    camera.translateZ(150);
    scene = new THREE.Scene();
        var obj_material = [ 
		new THREE.MeshPhongMaterial( { wireframe: false, side: THREE.DoubleSide, color: 0xff0000 } ),
	    new THREE.MeshBasicMaterial( { wireframe: true, side: THREE.DoubleSide, color: 0x444444 } )
	];
        var box_geometry = new THREE.BoxGeometry( 20, 40, 10, 2, 4, 1);
	box = THREE.SceneUtils.createMultiMaterialObject( box_geometry, obj_material );
	box.position.set( -70, 60, 0 );
	
        var sphere_geometry = new THREE.SphereGeometry( 20, 6, 8, 0*Math.PI/180, 90*Math.PI/180, 45*Math.PI/180, 90*Math.PI/180 );
	sphere = THREE.SceneUtils.createMultiMaterialObject( sphere_geometry, obj_material );
	sphere.position.set( -10, 60, 0 );
	
	var cylinder_geometry = new THREE.CylinderGeometry( 20, 15, 30, 8, 4, false, 0, 270*Math.PI/180 );
	cylinder = THREE.SceneUtils.createMultiMaterialObject( cylinder_geometry, obj_material );
	cylinder.position.set( 50, 60, 0 );

	var dodecahedron_geometry = new THREE.DodecahedronGeometry( 20, 0 );
	dodecahedron = THREE.SceneUtils.createMultiMaterialObject( dodecahedron_geometry, obj_material );
	dodecahedron.position.set( -70, 0, 0 );
	
	var icosahedron_geometry = new THREE.IcosahedronGeometry( 20, 0 );
	icosahedron = THREE.SceneUtils.createMultiMaterialObject( icosahedron_geometry, obj_material );
	icosahedron.position.set( -10, 0, 0 );
	
	var torus_geometry = new THREE.TorusGeometry( 15, 5, 8, 16, 270*Math.PI/180 );
	torus = THREE.SceneUtils.createMultiMaterialObject( torus_geometry, obj_material );
	torus.position.set( 50, 0, 0 );
	
	var torusknot_geometry = new THREE.TorusKnotGeometry( 15, 2, 64, 8, 4, 5 );
	torusknot = THREE.SceneUtils.createMultiMaterialObject( torusknot_geometry, obj_material );
	torusknot.position.set( -10, -60, 0 );
	
	var CustomSinCurve = THREE.Curve.create(
		function ( scale ) { this.scale = scale;  },
		function ( t ) { 
			var tx = Math.cos( 8 * Math.PI * t ),
			ty = Math.sin( 8 * Math.PI * t ),
			tz = t*4;
			return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
		}
	);
	var path = new CustomSinCurve( 10 );
	var tube_geometry = new THREE.TubeGeometry( path, 80, 2, 8, false );
        tube = THREE.SceneUtils.createMultiMaterialObject( tube_geometry, obj_material );
	tube.position.set( -60, -50, 0 );
	
	var parametric_geometry = new THREE.ParametricGeometry( function( u, v ){
		var k = 20;
		var tx = (2*u-1)*k, tz = (2*v-1)*k;
		var g = Math.sqrt(tx*tx+tz*tz);
		var ty = g*g/k-k;
		return new THREE.Vector3( tx, ty, tz );
	}, 8, 8 );
	parametric = THREE.SceneUtils.createMultiMaterialObject( parametric_geometry, obj_material );
	parametric.position.set( 50, -60, 0 );

	var light = new THREE.AmbientLight( 0x666666 );
        var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light1.position.set(100, 100, 100);
   	light1.lookAt(new THREE.Vector3(  0, 0, 0 ));
     
    scene.add( light, light1, box, sphere, cylinder, dodecahedron, 
		icosahedron, torus, torusknot, tube, parametric);
}
 
function animate(){
 	box.rotateY( Math.PI/180 );
	sphere.rotateY( Math.PI/180 );
	cylinder.rotateY( Math.PI/180 );
	dodecahedron.rotateY( Math.PI/180 );
	icosahedron.rotateY( Math.PI/180 );
	torus.rotateY( Math.PI/180 );
	torusknot.rotateY( Math.PI/180 );
	tube.rotateZ( Math.PI/180 );
	parametric.rotateY( Math.PI/180 );
	
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

