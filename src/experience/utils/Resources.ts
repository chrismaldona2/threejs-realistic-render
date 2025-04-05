import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { Source } from "../sources";
import EventEmitter from "./EventEmitter";

interface Loaders {
  gltfLoader: GLTFLoader;
  textureLoader: THREE.TextureLoader;
}

interface Items {
  [key: string]: THREE.Texture | GLTF;
}

class Resources extends EventEmitter {
  sources: Source[];
  loaders!: Loaders;
  toLoad: number;
  loaded: number;
  items: Items;

  constructor(sources: Source[]) {
    super();

    this.sources = sources;
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.items = {};

    this.setLoaders();
    this.load();
  }

  setLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const textureLoader = new THREE.TextureLoader();

    this.loaders = {
      gltfLoader,
      textureLoader,
    };
  }

  load() {
    this.sources.forEach((source) => {
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path as string, (gltf) => {
            this.items[source.name] = gltf;
            this.sourceLoaded(source, gltf);
          });
          break;

        case "texture":
          this.loaders.textureLoader.load(source.path as string, (texture) => {
            this.items[source.name] = texture;
            this.sourceLoaded(source, texture);
          });
          break;
      }
    });
  }

  sourceLoaded(source: Source, file: Items[string]) {
    this.items[source.name] = file;

    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}

export default Resources;
