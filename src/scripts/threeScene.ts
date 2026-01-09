import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Wireframe } from "three/addons/lines/Wireframe.js";
import { WireframeGeometry2 } from "three/addons/lines/WireframeGeometry2.js";

export function initThree(container: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    1,
    1000,
  );
  camera.position.set(-50, 0, 50);

  const controls = new OrbitControls(camera, renderer.domElement);

  const geo = new THREE.IcosahedronGeometry(20, 1);
  const geometry = new WireframeGeometry2(geo);

  const matLine = new LineMaterial({
    color: 0x4080ff,
    linewidth: 5,
  });

  const wireframe = new Wireframe(geometry, matLine);
  scene.add(wireframe);

  function resize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    matLine.resolution.set(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", resize);
  resize();

  function animate() {
    requestAnimationFrame(animate);
    wireframe.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  animate();
}
