import { Timer as TTimer } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter";

class Timer extends EventEmitter {
  instance: TTimer;
  elapsedTime: number;

  constructor() {
    super();
    this.instance = new TTimer();
    this.elapsedTime = this.instance.getElapsed();
    window.requestAnimationFrame(this.tick);
  }

  tick = () => {
    window.requestAnimationFrame(this.tick);
    this.instance.update();
    this.elapsedTime = this.instance.getElapsed();
    this.trigger("tick");
  };
}
export default Timer;
