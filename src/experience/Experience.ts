import * as THREE from "three";
import Sizes from "./utils/Sizes";
import FullscreenHandler from "./utils/FullscreenHandler";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./utils/Time";
import Debug from "./utils/Debug";
import Resources from "./utils/Resources";
import sources from "./sources";
import World from "./world/World";

class Experience {
  private static instance: Experience | null = null;
  debug!: Debug;
  sizes!: Sizes;
  canvas!: HTMLCanvasElement;
  resources!: Resources;
  scene!: THREE.Scene;
  time!: Time;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;

  constructor(canvas: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.canvas = canvas;
    new FullscreenHandler(this.canvas);

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.time = new Time();
    this.world = new World();

    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }

  static getInstance(): Experience {
    if (!Experience.instance) {
      throw new Error("Experience not initialized yet");
    }
    return Experience.instance;
  }
}

export default Experience;
