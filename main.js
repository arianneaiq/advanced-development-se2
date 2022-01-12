// Canvas
const canvas = document.querySelector('canvas.donuts')

//Scene
const scene = new THREE.Scene();

//code from https://stackoverflow.com/questions/19865537/three-js-set-background-image
const loader = new THREE.TextureLoader();
loader.load('img/donutsBackground.jpg', function(texture) {
    scene.background = texture;
});

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

//Group
const group = new THREE.Group();
scene.add(group);

/*const texture = new THREE.TextureLoader().load('img/donutsTexture2.jpg');
const geometry = new THREE.TorusGeometry(7, 3, 30, 100);
const material = new THREE.MeshBasicMaterial({ map: texture });
const donuts = new THREE.Mesh(geometry, material);
scene.add(donuts)*/

//Objects
const donuts = new THREE.Mesh(
    new THREE.TorusGeometry(7, 3, 30, 100),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/donutsTexture2.jpg') }),
)
group.add(donuts);

const donuts1 = new THREE.Mesh(
    new THREE.TorusGeometry(7, 3, 30, 100),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/donutsTexture4.jpg') }),
)
donuts.position.x = 35;
group.add(donuts1);

const donuts2 = new THREE.Mesh(
    new THREE.TorusGeometry(7, 3, 30, 100),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/donutsTexture5.jpg') }),
)
donuts2.position.x = -35;
group.add(donuts2);

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Animate
function animateDonuts() {
    window.requestAnimationFrame(animateDonuts);

    donuts.rotation.x += 0.01;
    donuts.rotation.y += 0.005;
    donuts.rotation.z += 0.01;

    donuts1.rotation.x += 0.01;
    donuts1.rotation.z += 0.01;

    donuts2.rotation.x += 0.005;
    donuts2.rotation.y += 0.01;
    donuts2.rotation.z += 0.005;

    group.rotation.y += 0.005;
    renderer.render(scene, camera);
};

animateDonuts();