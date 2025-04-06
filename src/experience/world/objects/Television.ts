import * as THREE from "three";
import Experience from "../../Experience";
import { GLTF } from "three/examples/jsm/Addons.js";

class Television {
  model: THREE.Object3D;

  constructor() {
    const { resources } = Experience.getInstance();
    const gltf = resources.getItem("televisionModel") as GLTF;

    this.model = gltf.scene;
    this.model.scale.setScalar(10);
    this.model.position.set(1.5, 8.3, -7);
    this.model.rotation.y = -Math.PI / 6;

    // SHADOWS
    this.model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
}

export default Television;
