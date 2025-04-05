import GUI from "lil-gui";

class Debug {
  static instance: Debug;
  gui!: GUI;

  constructor() {
    if (Debug.instance) {
      return Debug.instance;
    }
    this.gui = new GUI({ title: "Tweaks", width: 375 });
    Debug.instance = this;
  }

  static getInstance(): Debug {
    if (!Debug.instance) {
      throw new Error("Debug not initialized yet");
    }
    return Debug.instance;
  }
}

export default Debug;
