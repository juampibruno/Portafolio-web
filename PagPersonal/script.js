import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls;
let esfera, torus;

init();
animate();
document.body.onscroll = moveCamera;
moveCamera();

function init() {
	const canvas = document.querySelector('#c');
	scene = new THREE.Scene();

	// CAMARA
	const fov = 75;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 0.1;
	const far = 1000;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 30);

	// RENDERER
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// CONTROLES
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	// LUCES
	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);

		const ambientLight = new THREE.AmbientLight(0xFFFFFF);
		scene.add(ambientLight);
	}

	// ESTRELLAS
	const vertices = [];
	for (let i = 0; i < 10000; i++) {
		const x = THREE.MathUtils.randFloatSpread(2000);
		const y = THREE.MathUtils.randFloatSpread(2000);
		const z = THREE.MathUtils.randFloatSpread(2000);
		vertices.push(x, y, z);
	}

	const geometryPoint = new THREE.BufferGeometry();
	geometryPoint.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	const materialPoint = new THREE.PointsMaterial({ color: 0x888888 });
	const points = new THREE.Points(geometryPoint, materialPoint);
	scene.add(points);

	// ESFERA
	const radius = 16;
	const widthSegments = 32;
	const heightSegments = 16;
	const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
	const material = new THREE.PointsMaterial({ color: 0xff0000, sizeAttenuation: false, size: 4 });
	esfera = new THREE.Points(geometry, material);
	scene.add(esfera);


	// TorusKnot

	const geometryTorus = new THREE.TorusKnotGeometry(5, 3, 36, 16, 2, 3);
	const materialTorus = new THREE.MeshStandardMaterial({ color: "red", metalness: 0.9, roughness: 0.1, flatShading: true });
	torus = new THREE.Mesh(geometryTorus, materialTorus);
	torus.position.set(0, 0, 0);
	scene.add(torus);



	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Scroll Animation
function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	if (torus) {
		torus.rotation.x -= 0.005;
		torus.rotation.y -= 0.005;
	}
	camera.position.z = 30 - t * 0.01;
	camera.position.x = t * 0.0002;
	camera.rotation.y = t * 0.0002;
}

function animate() {
	requestAnimationFrame(animate);

	if (esfera) {
		esfera.rotation.x += 0.005;
		esfera.rotation.y += 0.005;
		esfera.rotation.z += 0.003;
	}

	controls.update();
	renderer.render(scene, camera);
}

//---------------------------------------------------------CODIGO CARROUSEL------------------------------------------------------------
let carouselContainer = document.querySelector('.carousel-container');
let cards = document.querySelectorAll('.proyect-card');
let currentIndex = 0;
let totalCards = cards.length;
let cardWidth = cards[0].clientWidth;

function slideNext() {
	if (currentIndex < totalCards - 1) {
		currentIndex++;
	} else {
		currentIndex = 0;
	}
	updateSlide();
}

function slidePrev() {
	if (currentIndex > 0) {
		currentIndex--;
	} else {
		currentIndex = totalCards - 1;
	}
	updateSlide();
}

function updateSlide() {
	let newPosition = -currentIndex * (cardWidth + 20); // por 10 de margen de cada lado
	carouselContainer.style.transform = `translateX(${newPosition}px)`;
}

// Agregar eventos de click a los botones de navegación si los tienes
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

console.log(nextButton);
console.log(prevButton);

nextButton.addEventListener('click', slideNext);
prevButton.addEventListener('click', slidePrev);


// O puedes agregar un temporizador para que el carrusel cambie automáticamente
// setInterval(slideNext, 5000); // Cambia cada 5 segundos (5000 milisegundos)
