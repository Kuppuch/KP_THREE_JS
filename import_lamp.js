var vertices, indices;

function parseCollada(colladaXml) {
    var xmlDoc;

    // создаем парсер DOM
    if (window.DOMParser) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(colladaXml, "text/xml");
    } else { // Internet Explorer
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(colladaXml);
    }

    var jsonResult = {};
    // находим /COLLADA/library_geometries/geometry/mesh/source/float_array
    var mesh = xmlDoc.getElementsByTagName("mesh")[0];
    var verticesSources = mesh.getElementsByTagName("source")[0];
    var verticesNode = verticesSources.getElementsByTagName("float_array")[0];
    // в этой секции хранятся координаты через пробел - получаем их массив
    jsonResult.vertices = verticesNode.textContent.split(" ");

    // находим /COLLADA/library_geometries/geometry/mesh/triangles/p
    var polyNode = mesh.getElementsByTagName("triangles")[0];
    var indecesNode = polyNode.getElementsByTagName("p")[0];
    var allIndices = indecesNode.textContent.split(" ");
    jsonResult.indices = [];
    // нужные нам индексы вершин находятся в 0, 3, 6 и т.д.
    for (var i = 0; i < allIndices.length; i += 2) {
        jsonResult.indices.push(allIndices[i]);
    }
    return jsonResult;
}

function loadXMLModel() {
    var request = new XMLHttpRequest();
    request.open("GET", "lamp.xml");
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            var colladaJson = parseCollada(request.responseText);
            vertices = colladaJson.vertices;
            indices = colladaJson.indices;
            lampInit();
        }
    }
    request.send();
}

function lampInit() {
    const geometry = new THREE.BufferGeometry();

    const vert = new Float32Array(vertices);

    geometry.setAttribute('position', new THREE.BufferAttribute(vert, 3));
    const material = new THREE.MeshLambertMaterial({
        color: 0x4444FF,
        side: THREE.DoubleSide
    });

    const lamp = new THREE.Mesh(geometry, material);
    lamp.castShadow = true;
    lamp.receiveShadow = true;
    lamp.position.y = 15;
    scene.add(lamp);
}

window.onload = () => {
    loadXMLModel();

} 