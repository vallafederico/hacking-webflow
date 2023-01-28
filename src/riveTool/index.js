import rive from "@rive-app/canvas";

// Parent Class
class Rive {
  constructor(item) {
    this.item = item;
    // console.log(item.dataset);

    this.create();
  }

  create() {
    // autoInject CANVAS
    this.cnv = document.createElement("canvas");
    this.item.appendChild(this.cnv);

    // Create Rive
    const { src, machines } = this.item.dataset;
    this.rv = new rive.Rive({
      src: src,
      canvas: this.cnv,
      autoplay: true,
      fit: rive.Fit.cover,
      onLoad: this.loaded.bind(this),
      stateMachines: machines,
    });

    // console.log(this.rv);
  }

  loaded() {
    this.rv.resizeDrawingSurfaceToCanvas(); // resize

    // console.log(
    //   "animation:",
    //   this.rv.animationNames,
    //   "stateMachines",
    //   this.rv.stateMachineNames,
    // );
  }
}

/* ---- Init */
const items = [...document.querySelectorAll("[data-rive]")];
// console.log(items);
injectCSS();
window.rive = items.map((item) => new Rive(item));

/* ---- Utils */
function injectCSS() {
  const style = document.createElement("style");

  const styleString = `
       [data-rive] > canvas {
        // border: 1px solid red;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `;

  style.textContent = styleString;
  document.head.append(style);
}
