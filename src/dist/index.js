(() => {
  // index.js
  var Scroll = class extends Lenis {
    constructor() {
      super({
        duration: 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        // https://easings.net
        direction: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1.5
      });
      this.time = 0;
      this.isActive = true;
      this.init();
    }
    init() {
      this.config();
      this.render();
      this.handleEditorView();
    }
    config() {
      const overscroll = [
        ...document.querySelectorAll('[data-scroll="overscroll"]')
      ];
      if (overscroll.length > 0) {
        overscroll.forEach(
          (item) => item.setAttribute("onwheel", "event.stopPropagation()")
        );
      }
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
      const anchor = [...document.querySelectorAll("[data-scrolllink]")];
      if (anchor.length > 0) {
        anchor.forEach((item) => {
          const id = parseFloat(item.dataset.scrolllink);
          const target = document.querySelector(`[data-scrolltarget="${id}"]`);
          if (target) {
            item.onclick = () => this.scrollTo(target);
          }
        });
      }
    }
    render() {
      this.raf(this.time += 10);
      window.requestAnimationFrame(this.render.bind(this));
    }
    /* ---- */
    handleEditorView() {
      const html = document.documentElement;
      const config = { attributes: true, childList: false, subtree: false };
      const callback = (mutationList, observer2) => {
        for (const mutation of mutationList) {
          if (mutation.type === "attributes") {
            const btn = document.querySelector(".w-editor-bem-EditSiteButton");
            const bar = document.querySelector(".w-editor-bem-EditorMainMenu");
            const addTrig = (target) => target.addEventListener("click", () => this.destroy());
            if (btn)
              addTrig(btn);
            if (bar)
              addTrig(bar);
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(html, config);
    }
  };
  window.SmoothScroll = new Scroll();
})();
