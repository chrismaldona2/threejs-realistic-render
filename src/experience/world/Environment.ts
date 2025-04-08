import * as THREE from "three";
import Experience from "../Experience";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";
import { GroundedSkybox } from "three/examples/jsm/Addons.js";

class Environment {
  scene: THREE.Scene;
  debug: Debug;
  resources: Resources;
  envmap?: THREE.Texture;

  constructor() {
    const context = Experience.getInstance();
    this.debug = context.debug;
    this.scene = context.scene;
    this.resources = context.resources;

    /* ENVMAP FOR SCENE ENVIRONMENT  */

    const envmapTexture = this.resources.getItem("garageEnvMap");

    if (!(envmapTexture instanceof THREE.Texture)) {
      console.error(
        "Expected a THREE.Texture for 'garageEnvMap', but got something else."
      );
      return;
    }

    this.envmap = envmapTexture;
    this.envmap.mapping = THREE.EquirectangularReflectionMapping;
    this.envmap.colorSpace = THREE.SRGBColorSpace;

    this.setEnvironmentMap();
    this.setGroundedSkyBox();
    this.setAmbientLight();
    this.setDirectionalLight();
  }

  setEnvironmentMap() {
    /* SCENE ENVIRONMENT SETUP (JUST FOR LIGHTNING) */
    if (this.envmap) this.scene.environment = this.envmap;
    this.scene.environmentIntensity = 0.9;

    /* ENVIRONMENT TWEAKS */
    if (this.debug) {
      const tweaks = this.debug.gui.addFolder("Environment");
      tweaks.add(this.scene, "environmentIntensity").min(0).max(3).step(0.001);
    }
  }

  setGroundedSkyBox() {
    /* GROUND SKY BOX ENVIRONMENT (FOR BACKGROUND IMAGE) */
    if (this.envmap) {
      const skybox = new GroundedSkybox(this.envmap, 24, 80, 512);
      skybox.position.y = 12;
      skybox.scale.setScalar(0.5);
      skybox.name = "GroundedSkyBox";
      this.scene.add(skybox);
    }
  }

  setAmbientLight() {
    /* AMBIENT LIGHT INITIALIZATION */
    const params = {
      color: 0xcfaa26,
    };
    const ambientLight = new THREE.AmbientLight(params.color, 1);

    /* AMBIENT LIGHT TWEAKS */
    if (this.debug) {
      const tweaks = this.debug.gui.addFolder("Ambient light");
      tweaks.addColor(params, "color").onChange(() => {
        ambientLight.color.set(params.color);
      });
      tweaks.add(ambientLight, "intensity").min(0).max(3).step(0.001);
    }

    this.scene.add(ambientLight);
  }

  setDirectionalLight() {
    /* DIRECTIONAL LIGHT INITIALIZATION */
    const params = {
      color: 0xf5ca7f,
    };
    const directionalLight = new THREE.DirectionalLight(params.color, 9);
    directionalLight.position.set(-14, 19, -7.25);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(512, 512);
    directionalLight.shadow.camera.far = 36.5;
    directionalLight.shadow.camera.near = 10.5;
    directionalLight.shadow.camera.top = 11.5;
    directionalLight.shadow.camera.right = 11.5;
    directionalLight.shadow.camera.bottom = -11.5;
    directionalLight.shadow.camera.left = -11.5;
    directionalLight.shadow.bias = -0.002;
    directionalLight.shadow.normalBias = 0.066;
    directionalLight.target.position.set(11.5, -1, -9);

    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    helper.visible = false;

    /* DIRECTIONAL LIGHT TWEAKS */
    if (this.debug) {
      const tweaks = this.debug.gui.addFolder("Directional Light");
      tweaks.addColor(params, "color").onChange(() => {
        directionalLight.color.set(params.color);
      });
      tweaks.add(directionalLight, "intensity").min(0).max(16).step(0.01);
      tweaks
        .add(directionalLight.shadow, "bias")
        .min(-0.05)
        .max(0.05)
        .step(0.001)
        .name("shadow bias");

      tweaks
        .add(directionalLight.shadow, "normalBias")
        .min(-0.05)
        .max(0.15)
        .step(0.001)
        .name("shadow normal bias");

      tweaks.add(helper, "visible").name("helper");

      const positionTweaks = tweaks.addFolder("Position");
      positionTweaks.close();

      positionTweaks
        .add(directionalLight.position, "x")
        .min(-50)
        .max(50)
        .step(0.001)
        .listen();
      positionTweaks
        .add(directionalLight.position, "y")
        .min(-50)
        .max(50)
        .step(0.001)
        .listen();
      positionTweaks
        .add(directionalLight.position, "z")
        .min(-50)
        .max(50)
        .step(0.001)
        .listen();

      const targetPositionTweaks = tweaks.addFolder("Target position");
      targetPositionTweaks.close();

      targetPositionTweaks
        .add(directionalLight.target.position, "x")
        .min(-50)
        .max(50)
        .step(0.001)
        .listen();
      targetPositionTweaks
        .add(directionalLight.target.position, "y")
        .min(-50)
        .max(50)
        .step(0.001)
        .listen();
      targetPositionTweaks
        .add(directionalLight.target.position, "z")
        .min(-50)
        .max(50)
        .step(0.001)
        .listen();
    }

    this.scene.add(directionalLight, directionalLight.target, helper);
  }
}

export default Environment;
