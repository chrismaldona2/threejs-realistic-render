class InstructionBanner {
  constructor() {
    const message = document.createElement("div");
    message.id = "instruction-banner";
    message.innerHTML = `
      <p>Press 'F' or double-click to toggle fullscreen mode</p>
      <p>Press 'H' to hide/show the tweaks panel</p>
      <a href="https://github.com/chrismaldona2/threejs-realistic-render.git" target="_blank">Source Code</a>
    `;
    message.style.opacity = "0";

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.opacity = "1";
    }, 0);

    setTimeout(() => {
      message.style.opacity = "0";
      setTimeout(() => {
        message.remove();
      }, 1000);
    }, 5000);
  }
}
export default InstructionBanner;
