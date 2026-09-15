class InstructionBanner {
  message: HTMLDivElement;
  isHidden: boolean;
  private keydownHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.message = document.createElement("div");
    this.message.id = "instruction-banner";
    this.message.innerHTML = `
      <p>Press 'F' or double-click to toggle fullscreen mode</p>
      <p>Press 'H' to hide/show the UI</p>
      <a href="https://github.com/chrismaldona2/threejs-realistic-render.git" target="_blank" style="color: #fff; text-decoration: underline;">Source Code</a>
    `;
    this.message.style.cssText = `
      z-index: 10;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 0.75rem;
      text-align: center;
      color: #fff;
      font-family: "SourceCodePro", system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      font-size: 1rem;
      transition: opacity 0.3s ease-in-out;
    `;
    document.body.appendChild(this.message);

    this.isHidden = false;

    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        this.toggle();
      }
    };
    window.addEventListener("keydown", this.keydownHandler);
  }

  toggle(): void {
    this.isHidden = !this.isHidden;
    this.message.style.opacity = this.isHidden ? "0" : "1";
    this.message.style.pointerEvents = this.isHidden ? "none" : "auto";
  }

  dispose(): void {
    window.removeEventListener("keydown", this.keydownHandler);
    this.message.remove();
  }
}

export default InstructionBanner;
