var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

renderer.setClearColor(0xffffff);

var makeCube = function(){
	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshPhongMaterial({color: 0xffffff});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	return cube;
}

var makeLights = function(scene){

	var light = new THREE.PointLight(0x00ff00);
	light.position.x = 3;
	light.position.y = 3;
	light.position.z = 3;

	if(scene){
		scene.add(light);
	}

	light = new THREE.PointLight(0xFF0000);
	light.position.x = -3;
	light.position.y = 3;
	light.position.z = 3;

	if(scene){
		scene.add(light);
	}

	light = new THREE.PointLight(0x0000ff);
	light.position.x = 0;
	light.position.y = -3;
	light.position.z = 3;

	if(scene){
		scene.add(light);
	}

	return light;
}

var light = makeLights(scene);

var cube1 = makeCube(scene);
var cube2 = makeCube(scene)

cube1.position.x = 1;
cube2.position.x = -1;

var startTime = + new Date();

function render(){

	var secondsPassed = (+ new Date() - startTime) / 1000;

	cube1.rotation.x = cube2.rotation.x = secondsPassed/7; 
	cube1.rotation.y = cube2.rotation.y = secondsPassed/13;
	cube1.rotation.y = cube2.rotation.y = secondsPassed;

	var sinSP = (Math.sin(secondsPassed - Math.PI/2) + 1)/2;

	cube1.scale.x = cube1.scale.y = cube1.scale.z = sinSP;

	var tau = Math.PI *2;

	var percentSP = (secondsPassed % tau)/Math.PI;
	if(percentSP > 1){
		percentSP = 1 - (percentSP -1);
	}

	cube2.scale.x = cube2.scale.y = cube2.scale.z = percentSP;

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();