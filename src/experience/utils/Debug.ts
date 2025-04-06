import GUI from "lil-gui";

class Debug {
  static instance: Debug;
  gui!: GUI;
  private keydownHandler!: (event: KeyboardEvent) => void;

  constructor() {
    if (Debug.instance) {
      return Debug.instance;
    }
    Debug.instance = this;
    this.gui = new GUI({ title: "Tweaks" });
    this.gui.hide();
    this.handleToggle();
  }

  show() {
    this.gui.show();
  }

  handleToggle() {
    this.keydownHandler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "h") {
        this.gui.show(this.gui._hidden);
      }
    };
    window.addEventListener("keydown", this.keydownHandler);
  }

  dispose() {
    window.removeEventListener("keydown", this.keydownHandler);
    this.gui.destroy();
  }

  static getInstance(): Debug {
    if (!Debug.instance) {
      throw new Error("Debug not initialized yet");
    }
    return Debug.instance;
  }
}

export default Debug;
