// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = -(event.clientY / window.innerHeight - 0.5);

    console.log(cursor.x, cursor.y)
})


//scene
const scene = new THREE.Scene();

//code from https://stackoverflow.com/questions/19865537/three-js-set-background-image
const loader = new THREE.TextureLoader();
loader.load('img/hemel.jpg', function(texture) {
    scene.background = texture;
});

//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

//group
const group = new THREE.Group();
scene.add(group);

//mesh
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 16),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/earth.jpg') }))
scene.add(earth);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/moon.jpg') }))
moon.position.x = 15;
scene.add(moon);
group.add(moon);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate);

    // de code hieronder niet gebruiken, omdat dit te maken heeft met fps(frame per second). 
    // de objecten van dit website gaan sneller draaien als de Computer een hoge fps heeft en draaien trager als de computer een lage fps heeft.

    earth.rotation.y -= 0.001;
    moon.rotation.z += 0.01;
    group.rotation.y += 0.005;

    //Om te voorkomen dat de website niet te traag of niet te snel reageerd, stellen we onze waarde gelijk aan de tijd m.b.v THREE.Clock()

    /*
    const elapsedTime = clock.getElapsedTime()

    earth.rotation.y -= elapsedTime / Math.PI / 100;
    moon.rotation.z += elapsedTime / Math.PI / 100;
    group.rotation.y += elapsedTime / Math.PI / 200; */

    //camera updates
    camera.position.x = cursor.x * 5
    camera.position.y = cursor.y * 5



    renderer.render(scene, camera);
};
animate();