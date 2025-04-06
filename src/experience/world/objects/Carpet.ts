import * as THREE from "three";
import Experience from "../../Experience";
import { GLTF } from "three/examples/jsm/Addons.js";

class Carpet {
  model: THREE.Object3D;
  constructor() {
    const { resources } = Experience.getInstance();
    const gltf = resources.getItem("carpetModel") as GLTF;

    this.model = gltf.scene;
    this.model.scale.setScalar(5);
    this.model.rotation.y = Math.PI / 3.25 + Math.PI;
    this.model.position.set(3, 0, -8);

    // SHADOWS
    this.model.traverse((object) => {
      if (object instanceof THREE.Mesh) object.receiveShadow = true;
    });
  }
}

export default Carpet;
