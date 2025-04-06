import * as THREE from "three";
import Experience from "../../Experience";
import { GLTF } from "three/examples/jsm/Addons.js";

class Apple {
  model: THREE.Object3D;

  constructor() {
    const { resources } = Experience.getInstance();
    const gltf = resources.getItem("appleModel") as GLTF;

    this.model = gltf.scene;
    this.model.scale.setScalar(10);
    this.model.position.set(-5, 8.3, -8);
    this.model.rotation.x = -0.25;
    this.model.rotation.z = -0.25;

    // SHADOWS
    this.model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
}

export default Apple;
