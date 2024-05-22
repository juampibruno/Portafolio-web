import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function main() {

	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	

	const scene = new THREE.Scene();

	//CAMARA

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	//CONTROLES
	const controls = new OrbitControls(camera, renderer.domElement);
	camera.position.set(0, 0, 30);
	controls.update();
	


	//LIGTHS 
	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(- 1, 2, 4);
		scene.add(light);

		const ambientLight = new THREE.AmbientLight(0xFFFFFF);
		scene.add(ambientLight);

		const gridHelper = new THREE.GridHelper(200, 50);
		// scene.add(gridHelper);

	}

	//OBJETOS


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



	const radius = 5;
	const widthSegments = 32;
	const heightSegments = 16;
	const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

	const material = new THREE.PointsMaterial({ color: 0xff0000, sizeAttenuation: false, size: 4 }); // color rojo

	const esfera = new THREE.Points(geometry, material);
	scene.add(esfera);


	//Textura
	const cuadroTexture = new THREE.TextureLoader().load("code.jpg");

// Torus
// const r =  2;  
// const tubeRadius =  1.5;  
// const radialSegments =  8;  
// const tubularSegments =  50;  
// const p = 18;  
// const q =  1;  
// const torusGeometry = new THREE.TorusKnotGeometry(
// 	r, tubeRadius, tubularSegments, radialSegments, p, q );

// const torusMaterial = new THREE.MeshBasicMaterial( { map: cuadroTexture } );
// const torus = new THREE.Mesh( torusGeometry, torusMaterial );
// torus.position.set(5, -20, 0);
// scene.add( torus );

	const box = new THREE.BoxGeometry(1, 1, 1);
	const materialBox = new THREE.MeshBasicMaterial({ map: cuadroTexture });
	const cuadro = new THREE.Mesh(box, materialBox);
	cuadro.position.set(0, 0, 0);
	scene.add(cuadro);
	




	function resizeRendererToDisplaySize(renderer) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {

			renderer.setSize(width, height, false);

		}

		return needResize;

	}

	// Scroll Animation

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;


	// torus.rotation.y += 0.02;
	// torus.rotation.z += 0.03;

	cuadro.rotation.x += 0.05;
	cuadro.rotation.y += 0.03;
  
	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
  }

  document.body.onscroll = moveCamera;
	moveCamera();




	function render(time) {

		time *= 0.001;


		if (resizeRendererToDisplaySize(renderer)) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		esfera.rotation.x += 0.005;
		esfera.rotation.y += 0.005;
		esfera.rotation.z += 0.003;

		controls.update();


		// cubes.forEach( ( cube, ndx ) => {

		// 	const speed = 1 + ndx * .1;
		// 	const rot = time * speed;
		// 	cube.rotation.x = rot;
		// 	cube.rotation.y = rot;

		// } );

		renderer.render(scene, camera);

		requestAnimationFrame(render);

	}

	requestAnimationFrame(render);

}

main();
