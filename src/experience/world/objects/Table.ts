import * as THREE from "three";
import Experience from "../../Experience";
import { GLTF } from "three/examples/jsm/Addons.js";

class Table {
  model: THREE.Object3D;

  constructor() {
    const { resources } = Experience.getInstance();
    const gltf = resources.getAsset("tableModel") as GLTF;

    if (gltf && gltf.scene instanceof THREE.Object3D) {
      this.model = gltf.scene;
      this.model.scale.setScalar(10);
      this.model.rotation.y = -Math.PI / 8;
      this.model.position.z = -8;

      // SHADOWS
      this.model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;

          // MATERIAL PROPERTIES
          if (object.material instanceof THREE.MeshStandardMaterial) {
            object.material.metalness = 0.25;
            object.material.roughness = 0.85;
          }
        }
      });
    } else {
      console.error(
        "Invalid 'tableModel' resource. Expected a GLTF object with a scene property."
      );
      this.model = new THREE.Object3D();
    }
  }
}

export default Table;
