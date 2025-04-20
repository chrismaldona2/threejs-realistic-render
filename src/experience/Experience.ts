import * as THREE from "three";
import Sizes from "./utils/Sizes";
import FullscreenHandler from "./utils/FullscreenHandler";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Timer from "./utils/Timer";
import Debug from "./utils/Debug";
import Resources from "./utils/Resources";
import World from "./world/World";
import InstructionBanner from "./utils/InstructionBanner";
import SpinnerLoader from "./utils/SpinnerLoader";

class Experience {
  private static instance: Experience | null = null;
  debug!: Debug;
  sizes!: Sizes;
  canvas!: HTMLCanvasElement;
  resources!: Resources;
  scene!: THREE.Scene;
  timer!: Timer;
  camera!: Camera;
  renderer!: Renderer;
  fullscreenHandler!: FullscreenHandler;
  world!: World;

  constructor(canvas: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    const spinnerLoader = new SpinnerLoader();

    this.canvas = canvas;
    this.fullscreenHandler = new FullscreenHandler(this.canvas);
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.resources = new Resources();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.timer = new Timer();
    this.world = new World();

    this.resources.on("loaded", () => {
      spinnerLoader.destroy();
      new InstructionBanner();
      if (this.debug) this.debug.show();
    });
    this.sizes.on("resize", () => this.resize());
    this.timer.on("tick", () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }

  destroy() {
    // REMOVE EVENT LISTENERS
    this.sizes.dispose();
    this.timer.off("tick");
    this.resources.off("loaded");
    this.fullscreenHandler.dispose();

    //  GEOMETRIES AND MATERIALS DISPOSE
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    // CONTROLS DISPOSE
    this.camera.orbitControls.dispose();
    // RENDERER DISPOSE
    this.renderer.instance.dispose();
    // DEBUG UI DISPOSE
    if (this.debug.gui) {
      this.debug.dispose();
    }
  }

  static getInstance(): Experience {
    if (!Experience.instance) {
      throw new Error("Experience not initialized yet");
    }
    return Experience.instance;
  }
}

export default Experience;
