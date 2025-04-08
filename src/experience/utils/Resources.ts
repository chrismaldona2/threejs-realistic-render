import * as THREE from "three";
import sources, { Source } from "../data/sources";
import EventEmitter from "./EventEmitter";
import { DRACOLoader, GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export type SupportedFile = THREE.Texture | GLTF;
export type SupportedLoader = THREE.TextureLoader | GLTFLoader;

class Resources extends EventEmitter {
  sources: Source[];
  items: Record<Source["name"], SupportedFile>;
  loaders: Record<Source["type"], SupportedLoader>;
  loadedItems: number;

  constructor() {
    super();
    this.sources = sources;
    this.items = {};
    this.loaders = this.intializeLoaders();
    this.loadedItems = 0;
    this.startLoading();
  }

  intializeLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/"); // → MAKE SURE THE DRACO FOLDER PATH IS CORRECT
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    const textureLoader = new THREE.TextureLoader();

    return { texture: textureLoader, gltf: gltfLoader };
  }

  startLoading() {
    sources.forEach((source) => {
      switch (source.type) {
        case "gltf":
          this.loaders.gltf.load(source.path, (gltf) =>
            this.sourceLoaded(source, gltf)
          );
          break;
        case "texture":
          this.loaders.texture.load(source.path, (texture) =>
            this.sourceLoaded(source, texture)
          );
          break;
      }
    });
  }

  sourceLoaded(source: Source, file: SupportedFile) {
    this.items[source.name] = file;
    this.loadedItems++;

    if (this.sources.length === this.loadedItems) {
      this.trigger("ready");
    }
  }

  getItem(name: Source["name"]): SupportedFile | undefined {
    const item = this.items[name];
    if (!item) {
      console.warn(`Resource "${name}" was not found in Resources.`);
      return undefined;
    }
    return item;
  }
}

export default Resources;
