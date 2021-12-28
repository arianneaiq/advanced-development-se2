const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const group = new THREE.Group();
scene.add(group);

/*const texture = new THREE.TextureLoader().load('img/donutsTexture2.jpg');
const geometry = new THREE.TorusGeometry(7, 3, 30, 100);
const material = new THREE.MeshBasicMaterial({ map: texture });
const donuts = new THREE.Mesh(geometry, material);
scene.add(donuts)*/

const donuts = new THREE.Mesh(
    new THREE.TorusGeometry(7, 3, 30, 100),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/donutsTexture.jpg') }),
)
group.add(donuts);

const donuts1 = new THREE.Mesh(
    new THREE.TorusGeometry(7, 3, 30, 100),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/donutsTexture2.jpg') }),
)
donuts.position.x = 35;
group.add(donuts1);


const canvas = document.querySelector('.donutsWebGl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

function animate() {
    requestAnimationFrame(animate);

    donuts.rotation.x += 0.01;
    donuts.rotation.y += 0.005;
    donuts.rotation.z += 0.01;

    donuts1.rotation.x += 0.01;
    donuts1.rotation.z += 0.01;

    group.rotation.y += 0.005;

    renderer.render(scene, camera);
};

animate();