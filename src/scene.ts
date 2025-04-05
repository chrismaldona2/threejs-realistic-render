import {
  DRACOLoader,
  GLTFLoader,
  GroundedSkybox,
  OrbitControls,
  Timer,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { toggleFullscreen } from "./fullscreen";

/* LOADERS */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/* GUI */
const gui = new GUI({ title: "Tweaks", width: 375 });

/* BASE */
const canvas = document.getElementById("canvas")!;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// RESIZE HANDLER
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});
// FULLSCREEN & GUI TOGGLE
window.addEventListener("keypress", (event) => {
  switch (event.key.toLowerCase()) {
    case "f":
      toggleFullscreen(renderer.domElement);
      break;
    case "h":
      gui.show(gui._hidden);
      break;
  }
});
canvas.addEventListener("dblclick", () => toggleFullscreen(canvas));

/* SCENE */
const scene = new THREE.Scene();

// ENVIRONMENT MAP
const environmentTweaks = gui.addFolder("Environment");
scene.environmentIntensity = 0.9;

const textureLoader = new THREE.TextureLoader();
textureLoader.load("./envmaps/garage/4k.webp", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  environmentMap.colorSpace = THREE.SRGBColorSpace;
  scene.environment = environmentMap;

  const skybox = new GroundedSkybox(environmentMap, 24, 80, 512);
  skybox.position.y = 12;
  skybox.scale.setScalar(0.5);
  scene.add(skybox);
});

environmentTweaks
  .add(scene, "environmentIntensity")
  .min(0)
  .max(3)
  .step(0.01)
  .listen();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(15, 17, 22.6);
scene.add(camera);

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const render = () => {
  renderer.render(scene, camera);
};

const rendererTweaks = gui.addFolder("Renderer");

/* TONE MAPPING */
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.7;
rendererTweaks.add(renderer, "toneMapping").options({
  none: THREE.NoToneMapping,
  linear: THREE.LinearToneMapping,
  reinhard: THREE.ReinhardToneMapping,
  cineon: THREE.CineonToneMapping,
  "ACES-filmic": THREE.ACESFilmicToneMapping,
});
rendererTweaks
  .add(renderer, "toneMappingExposure")
  .min(0)
  .max(5)
  .step(0.01)
  .listen();

/* ORBIT CONTROLS */
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.02;
orbitControls.target.set(0, 8, 0);
orbitControls.maxPolarAngle = Math.PI / 2.5;
orbitControls.maxDistance = 31;
orbitControls.maxTargetRadius = 10;
orbitControls.addEventListener("change", () => console.log(camera.position));

/* ANIMATION */
const timer = new Timer();

const animate = () => {
  window.requestAnimationFrame(animate);
  timer.update();
  orbitControls.update();
  render();
};

/* OBJECTS */
const objectsGroup = new THREE.Group();
// TABLE
gltfLoader.load("./models/table/table.gltf", (gltf) => {
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
  objectsGroup.add(model);
});
// TV
gltfLoader.load("./models/television/television.gltf", (gltf) => {
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
  objectsGroup.add(model);
});
// APPLE
gltfLoader.load("./models/apple/apple.gltf", (gltf) => {
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

  objectsGroup.add(model);
});
objectsGroup.rotation.y = 12;
scene.add(objectsGroup);

//CARPET
gltfLoader.load("./models/carpet/carpet.gltf", (gltf) => {
  const model = gltf.scene;
  model.scale.setScalar(5);
  model.rotation.y = Math.PI / 3.25 + Math.PI;
  model.position.set(3, 0, -8);

  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.receiveShadow = true;
    }
  });

  objectsGroup.add(model);
});
objectsGroup.position.z = 1.25;
objectsGroup.rotation.y = 0.25;
scene.add(objectsGroup);

/* LIGHTS */
// AMBIENT LIGHT
const ambientLightParams = {
  color: 0xcfaa26,
};
const ambientLight = new THREE.AmbientLight(ambientLightParams.color, 1);

const ambientLightTweaks = gui.addFolder("Ambient Light");
ambientLightTweaks.addColor(ambientLightParams, "color").onChange(() => {
  ambientLight.color.set(ambientLightParams.color);
});
ambientLightTweaks.add(ambientLight, "intensity").min(0).max(3).step(0.01);

// DIRECTIONAL LIGHT
const directionalLightParams = {
  color: 0xf5ca7f,
};
const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  10
);
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

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;

const directionalLightTweaks = gui.addFolder("Directional Light");
directionalLightTweaks
  .addColor(directionalLightParams, "color")
  .onChange(() => {
    directionalLight.color.set(directionalLightParams.color);
  });
directionalLightTweaks
  .add(directionalLight, "intensity")
  .min(0)
  .max(16)
  .step(0.01);

directionalLightTweaks
  .add(directionalLight.shadow, "bias")
  .min(-0.05)
  .max(0.05)
  .step(0.001)
  .name("shadow bias");

directionalLightTweaks
  .add(directionalLight.shadow, "normalBias")
  .min(-0.05)
  .max(0.15)
  .step(0.001)
  .name("shadow normal bias");

directionalLightTweaks
  .add(directionalLightCameraHelper, "visible")
  .name("helper");

const directionalLightPositionTweaks =
  directionalLightTweaks.addFolder("Position");
directionalLightPositionTweaks.close();

directionalLightPositionTweaks
  .add(directionalLight.position, "x")
  .min(-50)
  .max(50)
  .listen();
directionalLightPositionTweaks
  .add(directionalLight.position, "y")
  .min(-50)
  .max(50)
  .listen();
directionalLightPositionTweaks
  .add(directionalLight.position, "z")
  .min(-50)
  .max(50)
  .listen();

const directionalLightTargetPositionTweaks =
  directionalLightTweaks.addFolder("Target position");
directionalLightTargetPositionTweaks.close();

directionalLightTargetPositionTweaks
  .add(directionalLight.target.position, "x")
  .min(-50)
  .max(50)
  .listen();
directionalLightTargetPositionTweaks
  .add(directionalLight.target.position, "y")
  .min(-50)
  .max(50)
  .listen();
directionalLightTargetPositionTweaks
  .add(directionalLight.target.position, "z")
  .min(-50)
  .max(50)
  .listen();
scene.add(
  ambientLight,
  directionalLight,
  directionalLight.target,
  directionalLightCameraHelper
);

/* RUN */
animate();
