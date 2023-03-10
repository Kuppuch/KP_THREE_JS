function sceneBuild(scene, objects) {

    objects.forEach(element => {
        if (element.length > 0) {
            element.forEach(el => {
                scene.add(el)
            })
        } else {
            scene.add(element)
        }
    });
}