import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../utils/Resources";
import { GLTF } from "three/examples/jsm/Addons.js";

class ObjectGroup {
  group: THREE.Group;
  resources: Resources;

  constructor() {
    const context = Experience.getInstance();
    this.resources = context.resources;
    this.group = new THREE.Group();

    this.createCarpet();
    this.createTable();
    this.createTelevision();
    this.createApple();

    this.group.position.z = 1.25;
    this.group.rotation.y = 0.25;

    context.scene.add(this.group);
  }

  createCarpet() {
    const gltf = this.resources.items["carpetModel"] as GLTF;
    const model = gltf.scene;
    model.scale.setScalar(5);
    model.rotation.y = Math.PI / 3.25 + Math.PI;
    model.position.set(3, 0, -8);
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.receiveShadow = true;
      }
    });
    this.group.add(model);
  }

  createTable() {
    const gltf = this.resources.items["tableModel"] as GLTF;
    const model = gltf.scene;
    model.scale.setScalar(10);
    model.rotation.y = -Math.PI / 8;
    model.position.z = -8;
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.material instanceof THREE.MeshStandardMaterial) {
          object.material.metalness = 0.25;
          object.material.roughness = 0.85;
        }
      }
    });
    this.group.add(model);
  }

  createTelevision() {
    const gltf = this.resources.items["televisionModel"] as GLTF;
    const model = gltf.scene;
    model.scale.setScalar(10);
    model.position.set(1.5, 8.3, -7);
    model.rotation.y = -Math.PI / 6;
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    this.group.add(model);
  }

  createApple() {
    const gltf = this.resources.items["appleModel"] as GLTF;
    const model = gltf.scene;
    model.scale.setScalar(10);
    model.position.set(-5, 8.3, -8);
    model.rotation.x = -0.25;
    model.rotation.z = -0.25;
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    this.group.add(model);
  }
}

export default ObjectGroup;
