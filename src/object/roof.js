function addRoof() {
    
        const roof_geometry = new THREE.PlaneGeometry(500, 300);
        const texture = loader.load('tex/Planks023A_1K-JPG/Planks023A_1K_Color.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 8);
        const roof_material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });

        const roof = new THREE.Mesh(roof_geometry, roof_material);
        roof.rotation.x = Math.PI / 2;
        roof.position.y = 79.8;
        roof.position.z = 70;
        return roof
    
}