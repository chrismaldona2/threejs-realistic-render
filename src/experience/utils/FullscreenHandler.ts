// @ts-nocheck
class FullscreenHandler {
  canvas: HTMLCanvasElement;
  handleDblClick: () => void;
  handleKeydown: (event: KeyboardEvent) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.handleDblClick = () => this.toggleFullscreen();
    this.handleKeydown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "f") this.toggleFullscreen();
    };

    this.canvas.addEventListener("dblclick", this.handleDblClick);
    window.addEventListener("keydown", this.handleKeydown);
  }

  dispose() {
    this.canvas.removeEventListener("dblclick", this.handleDblClick);
    window.removeEventListener("keydown", this.handleKeydown);
  }

  goFullscreen() {
    if (this.canvas.requestFullscreen) {
      this.canvas.requestFullscreen();
    } else if (this.canvas.webkitRequestFullscreen) {
      this.canvas.webkitRequestFullscreen();
    } else if (this.canvas.mozRequestFullscreen) {
      this.canvas.mozRequestFullscreen();
    } else if (this.canvas.msRequestFullscreen) {
      this.canvas.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozExitFullscreen) {
      document.mozExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  toggleFullscreen() {
    const hasFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement;

    if (hasFullscreen) {
      this.exitFullscreen();
    } else {
      this.goFullscreen();
    }
  }
}

export default FullscreenHandler;
