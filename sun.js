function initSun(scene) {


    var geometry = new THREE.SphereGeometry(30, 32, 32);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    scene.add(mesh);

    // SUPER SIMPLE GLOW EFFECT
    // use sprite because it appears the same from all angles
    var spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.ImageUtils.loadTexture('textures/glow.png'),
        color: 0xffff00,
        transparent: false,
        blending: THREE.AdditiveBlending
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(125, 125, 1.0);
    mesh.add(sprite); // this centers the glow at the mesh

}
