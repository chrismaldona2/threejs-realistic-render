// @ts-nocheck
class FullscreenHandler {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.canvas.addEventListener("dblclick", () => this.toggleFullscreen());
    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "f") this.toggleFullscreen();
    });
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
