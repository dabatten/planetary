var container, stats;
var camera, scene, renderer, particles, geometry, materials = [],
    parameters, i, h, color, sprite, size;
var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
//animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    geometry = new THREE.Geometry();

    var textureLoader = new THREE.TextureLoader();

    var yellow_star = textureLoader.load("images/star.png");
    var red_star = textureLoader.load("images/star_red.png");
    var blue_star = textureLoader.load("images/star_blue.png");
    var white_star = textureLoader.load("images/star_white.png");


    for (i = 0; i < 10000; i++) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;

        geometry.vertices.push(vertex);

    }

    parameters = [yellow_star, red_star, blue_star, white_star];

    console.log(parameters);

    for (i = 0; i < parameters.length; i++) {

        sprite = parameters[i];

        materials[i] = new THREE.PointsMaterial({
            size: 115,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        particles = new THREE.Points(geometry, materials[i]);

        var pX = Math.random() * 450 - 250,
                pY = Math.random() * 450 - 250,
                pZ = Math.random() * 450 - 250,
                particle = new THREE.Vector3(pX, pY, pZ);

        scene.add(particles);

    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}



//

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    for (i = 0; i < scene.children.length; i++) {

        var object = scene.children[i];

        if (object instanceof THREE.Points) {

            object.rotation.z += 0.008;

        }

    }

    renderer.render(scene, camera);

}
