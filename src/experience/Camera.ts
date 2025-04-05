import * as THREE from "three";
import Experience from "./Experience";
import Sizes from "./utils/Sizes";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Camera {
  sizes: Sizes;
  instance: THREE.PerspectiveCamera;
  orbitControls: OrbitControls;

  constructor() {
    const experience = Experience.getInstance();

    this.sizes = experience.sizes;
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(15, 17, 22.6);

    // orbit controls
    this.orbitControls = new OrbitControls(this.instance, experience.canvas);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.02;
    this.orbitControls.target.set(0, 8, 0);
    this.orbitControls.maxPolarAngle = Math.PI / 2.5;
    this.orbitControls.maxDistance = 31;
    this.orbitControls.maxTargetRadius = 10;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.orbitControls.update();
  }
}

export default Camera;
