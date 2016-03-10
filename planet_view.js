$(document).ready(function () {


    var renderer, scene, camera, planet;


    function init() {
        //  --- Setup ---
        // set the scene size
        var WIDTH = 800,
            HEIGHT = 600;

        // set some camera attributes
        var VIEW_ANGLE = 45,
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,
            FAR = 10000;

        // get the DOM element to attach to
        // - assume we've got jQuery to hand
        var $container = $('#viewer');

        // create a WebGL renderer, camera
        // and a scene
        renderer = new THREE.WebGLRenderer();
        camera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR);

        scene = new THREE.Scene();

        // add the camera to the scene
        scene.add(camera);

        // the camera starts at 0,0,0
        // so pull it back
        camera.position.z = 150;

        // start the renderer
        renderer.setSize(WIDTH, HEIGHT);

        // attach the render-supplied DOM element
        $container.append(renderer.domElement);


        // --- Planet Builder ---
        var loader = new THREE.TextureLoader();
        var planet_geometry = new THREE.SphereGeometry(40, 100, 100);
        var clr = loader.load("textures/planets/mercury/mercurymap.jpg");
        var bmp = loader.load("textures/planets/merucry/mercurybump.jpg");

        var planet_surface = new THREE.MeshPhongMaterial({
            map: clr,
            bumpMAp: bmp,
            shininess: 15
        });

        planet = new THREE.Mesh(planet_geometry, planet_surface);
        scene.add(planet)


        var light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        var controls = new THREE.OrbitControls(camera);
        controls.target.set(0, 0, 0);
        controls.maxDistance = 2000;
        controls.minDistance = 100;
        controls.update();


    }

    function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        planet.rotation.y += 0.005;
        render();
        //update();
    }

    init();
    animate();
});
