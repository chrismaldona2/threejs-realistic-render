import * as THREE from "three";
import Experience from "./Experience";
import Sizes from "./utils/Sizes";

class Renderer {
  experience: Experience;
  instance: THREE.WebGLRenderer;
  sizes: Sizes;

  constructor() {
    this.experience = Experience.getInstance();

    this.sizes = this.experience.sizes;
    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.7;

    // TWEAKS
    if (this.experience.debug) {
      const tweaks = this.experience.debug.gui.addFolder("Renderer");

      tweaks.add(this.instance, "toneMapping").options({
        none: THREE.NoToneMapping,
        linear: THREE.LinearToneMapping,
        reinhard: THREE.ReinhardToneMapping,
        cineon: THREE.CineonToneMapping,
        "ACES-filmic": THREE.ACESFilmicToneMapping,
      });
      tweaks
        .add(this.instance, "toneMappingExposure")
        .min(0)
        .max(5)
        .step(0.01)
        .listen();
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(
      this.experience.scene,
      this.experience.camera.instance
    );
  }
}
export default Renderer;
