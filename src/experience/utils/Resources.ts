import * as THREE from "three";
import sources, { Source } from "../data/sources";
import EventEmitter from "./EventEmitter";
import { DRACOLoader, GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

type SupportedLoaders = GLTFLoader | THREE.TextureLoader;
type SupportedFiles = GLTF | THREE.Texture;

class Resources extends EventEmitter {
  sources: Source[];
  items: Record<Source["name"], SupportedFiles>;
  loaders: Record<Source["type"], SupportedLoaders>;
  private toLoad: number;
  private loaded: number;

  constructor() {
    super();
    this.sources = sources;
    this.items = {};
    this.loaders = this.intializeLoaders();
    this.loaded = 0;
    this.toLoad = sources.length;
    this.startLoading();
  }

  private intializeLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/"); // → MAKE SURE THE DRACO FOLDER PATH IS CORRECT
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    const textureLoader = new THREE.TextureLoader();

    return { texture: textureLoader, gltf: gltfLoader };
  }

  private startLoading() {
    this.sources.forEach(({ name, type, path }) => {
      this.loaders[type].load(
        path,
        (file) => {
          this.items[name] = file;
          this.fileLoaded();
        },
        undefined,
        (error) => {
          console.error(`Error loading ${name}:`, error);
          this.fileLoaded();
        }
      );
    });
  }

  private fileLoaded() {
    this.loaded++;
    if (this.toLoad === this.loaded) {
      this.trigger("loaded");
    }
  }

  getAsset<T extends SupportedFiles>(name: string): T | undefined {
    return this.items[name] as T;
  }
}

export default Resources;
