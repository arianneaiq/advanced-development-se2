// Canvas
const canvas = document.querySelector('canvas.hemel')

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
camera.position.z = 5;

//group
const group = new THREE.Group();
scene.add(group);

//mesh
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 16),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/earth.jpg') }))
scene.add(earth);



const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/moon.jpg') }))
moon.position.x = 15;
scene.add(moon);
group.add(moon);

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight);
const clock = new THREE.Clock()

function animate() {
    window.requestAnimationFrame(animate);

    // de code hieronder niet gebruiken, omdat dit te maken heeft met fps(frame per second). 
    // de objecten van dit website gaan sneller draaien als de Computer een hoge fps heeft en draaien trager als de computer een lage fps heeft.

    /* earth.rotation.y -= 0.001;
     moon.rotation.z += 0.01;
     group.rotation.y += 0.005;*/

    //Om te voorkomen dat de website niet te traag of niet te snel reageerd, stellen we onze waarde gelijk aan de tijd m.b.v THREE.Clock()


    const elapsedTime = clock.getElapsedTime()

    earth.rotation.y = elapsedTime / Math.PI / 2;
    moon.rotation.z = elapsedTime / Math.PI / 2;
    group.rotation.y = elapsedTime / Math.PI / 4;

    //camera updates
    // sin(x) + cos (x) = 1 (dus 1 hele cirkel) 
    //Math.PI *2 = 360 grade. 
    //* 50 is voor de afstand tussen de camera en de object
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 50
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 50
    camera.position.y = cursor.y * 50
    camera.lookAt(earth.position)



    /*camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3
    camera.lookAt(earth.position)*/


    renderer.render(scene, camera);
};
animate();