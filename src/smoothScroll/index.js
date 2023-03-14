import Lenis from "@studio-freight/lenis";

class Scroll extends Lenis {
  constructor() {
    super({
      duration: 1.5,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      orientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    this.injectCSS();

    this.isActive = true;
    this.init();
  }

  init() {
    this.config();
    this.useAnchors();
    this.render();
  }

  useAnchors() {
    // anchor links
    [...document.querySelectorAll("[data-scrolllink]")].forEach((item) => {
      const target = document.querySelector(item.dataset.scrolllink);
      if (target)
        item.addEventListener("click", () => {
          this.scrollTo(target);
        });
    });
  }

  //   scrollToSection() {}

  config() {
    // allow scrolling on overflow elements
    const overscroll = [
      ...document.querySelectorAll('[data-scroll="overscroll"]'),
    ];

    if (overscroll.length > 0) {
      overscroll.forEach((item) =>
        item.setAttribute("onwheel", "event.stopPropagation()")
      );
    }

    // stop and start scroll btns
    const stop = [...document.querySelectorAll('[data-scroll="stop"]')];
    if (stop.length > 0) {
      stop.forEach((item) => {
        item.onclick = () => {
          this.stop();
          this.isActive = false;
        };
      });
    }

    const start = [...document.querySelectorAll('[data-scroll="start"]')];
    if (start.length > 0) {
      start.forEach((item) => {
        item.onclick = () => {
          this.start();
          this.isActive = true;
        };
      });
    }

    // toggle page scrolling
    const toggle = [...document.querySelectorAll('[data-scroll="toggle"]')];
    if (toggle.length > 0) {
      toggle.forEach((item) => {
        item.onclick = () => {
          if (this.isActive) {
            this.stop();
            this.isActive = false;
          } else {
            this.start();
            this.isActive = true;
          }
        };
      });
    }
  }

  render(time) {
    this.raf(time);
    window.requestAnimationFrame(this.render.bind(this));
    this.renderWebflow(time);
  }

  renderWebflow() {
    // empty function to access the raf from webflow
  }

  /* ---- */
  handleEditorView() {
    const html = document.documentElement;
    const config = { attributes: true, childList: false, subtree: false };

    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          const btn = document.querySelector(".w-editor-bem-EditSiteButton");
          const bar = document.querySelector(".w-editor-bem-EditorMainMenu");
          const addTrig = (target) =>
            target.addEventListener("click", () => this.destroy());

          if (btn) addTrig(btn);
          if (bar) addTrig(bar);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(html, config);
  }

  injectCSS() {
    const style = document.createElement("style");

    const styleString = `
    .lenis.lenis-smooth {
        scroll-behavior: auto;  
    }
    html.lenis {
        height: auto;
    }
    `;

    style.textContent = styleString;
    document.head.append(style);
  }
}

window.SmoothScroll = new Scroll();

/*
TODO
- add lenis listenable events from wf DOM
- add configurable external interface

*/

function readControls(attribute, key) {}

readControls();
