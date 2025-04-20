import Experience from "../Experience.js";
import Environment from "./Environment.js";
import RoomElements from "./RoomElements.js";

export default class World {
  environment!: Environment;
  roomElements!: RoomElements;

  constructor() {
    const context = Experience.getInstance();

    context.resources.on("loaded", () => {
      this.roomElements = new RoomElements();
      this.environment = new Environment();
    });
  }
}
