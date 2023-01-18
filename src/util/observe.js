import Emitter from "tiny-emitter";

export class Observe extends Emitter {
  constructor({ element, config, addClass }) {
    super();
    this.element = element;

    this.config = {
      root: config?.root || null,
      margin: config?.margin || "10px",
      threshold: config?.threshold || 0,
      once: config.once,
    };

    if (addClass !== undefined) this.addClass = addClass;
    this.init();
    this.start();
  }

  init() {
    this.in = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isIn();
          }
        });
      },
      {
        // root: this.config.root,
        rootMargin: this.config.margin,
        threshold: this.config.threshold,
      }
    );

    this.out = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.isOut();
          }
        });
      },
      {
        // root: document.querySelector('#scrollArea'),
        rootMargin: "000px",
        threshold: 0,
      }
    );
  }

  start() {
    this.in.observe(this.element);
    this.out.observe(this.element);
  }

  stop() {
    this.in.unobserve(this.element);
    this.out.unobserve(this.element);
  }

  isIn() {
    // console.log("in");
    if (this.addClass) this.element.classList.add(this.addClass);
    this.emit("IN");

    if (this.config.once) this.stop();
    this.animateIn();
  }

  isOut() {
    // console.log("out");
    if (this.addClass) this.element.classList.remove(this.addClass);

    this.emit("OUT");
    this.animateOut();
  }
}
