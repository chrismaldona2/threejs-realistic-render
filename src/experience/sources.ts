export interface Source {
  name: string;
  type: "texture" | "gltfModel";
  path: string | string[];
}

/* FILES WHICH WILL BE LOADED BY THE RESOURCES CLASS (./utils/Resources.ts) */
const sources: Source[] = [
  {
    name: "garageEnvMap",
    type: "texture",
    path: "./envmaps/garage/4k.webp",
  },
  {
    name: "appleModel",
    type: "gltfModel",
    path: "./models/apple/apple.gltf",
  },
  {
    name: "carpetModel",
    type: "gltfModel",
    path: "./models/carpet/carpet.gltf",
  },
  {
    name: "tableModel",
    type: "gltfModel",
    path: "./models/table/table.gltf",
  },
  {
    name: "televisionModel",
    type: "gltfModel",
    path: "./models/television/television.gltf",
  },
];

export default sources;
