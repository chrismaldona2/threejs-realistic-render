class SpinnerLoader {
  spinner: HTMLDivElement;
  constructor() {
    this.spinner = document.createElement("div");
    this.spinner.className = "spinner";

    document.body.appendChild(this.spinner);
  }
  destroy() {
    this.spinner.remove();
  }
}

export default SpinnerLoader;
