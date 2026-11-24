import * as THREE from 'three';
import { createWorld } from './world.js';
import { Player } from './player.js';

const blocker = document.getElementById('blocker');

const scene = new THREE.Scene();
createWorld(scene);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const player = new Player(camera, document.body);

player.onLock(() => {
  blocker.classList.add('hidden');
});

player.onUnlock(() => {
  blocker.classList.remove('hidden');
});

blocker.addEventListener('click', () => {
  player.lock();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  const delta = Math.min(clock.getDelta(), 0.05);
  player.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
