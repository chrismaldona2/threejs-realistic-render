import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../utils/Resources";
import Carpet from "./objects/Carpet";
import Television from "./objects/Television";
import Table from "./objects/Table";
import Apple from "./objects/Apple";

class RoomElements {
  resources: Resources;
  group: THREE.Group;
  carpet: Carpet;
  table: Table;
  television: Television;
  apple: Apple;

  constructor() {
    const context = Experience.getInstance();
    this.resources = context.resources;
    this.group = new THREE.Group();

    this.carpet = new Carpet();
    this.table = new Table();
    this.television = new Television();
    this.apple = new Apple();

    this.group.add(
      this.carpet.model,
      this.table.model,
      this.television.model,
      this.apple.model
    );
    this.group.position.z = 1.25;
    this.group.rotation.y = 0.25;

    context.scene.add(this.group);
  }
}

export default RoomElements;
