// src/scripts/threeScene.ts

import * as THREE from 'three';

export function initThreeScene() {
  const canvas = document.querySelector(
    '#mi-canvas-3d'
  ) as HTMLCanvasElement;
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6; // Posición inicial de la cámara

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearAlpha(0);

  // --- ¡NUEVA GEOMETRÍA: EL QUESITO (TOROIDE)! ---
  // TorusGeometry(radius, tube, radialSegments, tubularSegments)
  // radius: Radio del toroide desde el centro hasta el centro del "tubo"
  // tube: Radio del "tubo" del toroide
  const geometry = new THREE.TorusGeometry(3, 1, 16, 100); // Un donut grande y con un tubo grueso
  
  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.5,
    metalness: 0.8,
    // ¡CLAVE! Dibuja la parte exterior del tubo, no necesitamos BackSide
    side: THREE.FrontSide, 
    transparent: true,
  });

  const shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  // 4. Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  return { shape, scene, camera, renderer };
}