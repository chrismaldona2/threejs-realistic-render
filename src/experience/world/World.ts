import Experience from "../Experience.js";
import Environment from "./Environment.js";
import ObjectGroup from "./ObjectGroup.js";

export default class World {
  constructor() {
    const context = Experience.getInstance();

    context.resources.on("ready", () => {
      new Environment();
      new ObjectGroup();
    });
  }
}
