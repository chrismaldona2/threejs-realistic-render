import { Timer } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter";

class Time extends EventEmitter {
  timer: Timer;

  constructor() {
    super();
    this.timer = new Timer();

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    this.timer.update();
    this.trigger("tick");
    window.requestAnimationFrame(() => this.tick());
  }
}

export default Time;
