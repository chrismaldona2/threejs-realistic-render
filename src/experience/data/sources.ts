export type SourceType = "texture" | "gltf";

export type Source = {
  name: string;
  type: SourceType;
  path: string;
};

/* FILES WHICH WILL BE LOADED BY THE RESOURCES CLASS (./utils/Resources.ts) */
const sources: Source[] = [
  {
    name: "garageEnvMap",
    type: "texture",
    path: "./envmaps/garage/4k.webp",
  },
  {
    name: "appleModel",
    type: "gltf",
    path: "./models/apple/apple.gltf",
  },
  {
    name: "carpetModel",
    type: "gltf",
    path: "./models/carpet/carpet.gltf",
  },
  {
    name: "tableModel",
    type: "gltf",
    path: "./models/table/table.gltf",
  },
  {
    name: "televisionModel",
    type: "gltf",
    path: "./models/television/television.gltf",
  },
];

export default sources;
