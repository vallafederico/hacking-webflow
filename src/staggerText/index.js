import Tween from "gsap";
import SplitType from "split-type";
import { Observe } from "../util/observe.js";

//

class TextAnimation extends Observe {
  constructor(item) {
    // define config
    const config = {
      // observer config
      root: null,
      margin: item.dataset.obsM ?? "10px",
      threshold: +item.dataset.obsT ?? 0,
      once: item.dataset.obsOnce === "true" ? true : false,
      // text split config
      aSplit: item.dataset.aSplit ?? "words",
      // aOnce: item.dataset.aOnce ?? false,
      aStagger: item.dataset.aStagger ?? 0.05,
      aDuration: item.dataset.aDuration ?? 1.9,
      aEach: item.dataset.aEach ?? 0.05,
      aDelay: item.dataset.aDelay ?? 0,
    };

    super({ element: item, config });
    this.config = config;

    this.item = item;
    this.animated = returnSplit(item);

    this.a = {
      y: "120%",
      x: "0%",
    };

    Tween.set(this.animated, { y: this.a.y });
  }

  animateIn() {
    console.log("in");

    this.animation?.kill();
    this.animation = Tween.to(this.animated, {
      y: "0%",
      duration: this.config.aDuration,
      stagger: {
        each: this.config.aStagger,
      },
      ease: "expo.out",
    });
  }

  animateOut() {
    console.log("out");

    this.animation?.kill();
    this.animation = Tween.set(this.animated, { y: this.a.y });
  }
}

//  --------- > Caller
class StaggerText {
  constructor(selector) {
    this.selector = selector;
    this.reference = [...document.querySelectorAll(`[${selector}]`)];
    if (!this.reference) return;
    this.injectCss();
    this.init();
  }

  init() {
    this.animations = this.reference.map((item) => {
      return new TextAnimation(item);
    });
  }

  injectCss() {
    const style = document.createElement("style");

    const styleString = `
      [${this.selector}] {
      }

       [${this.selector}] > div {
        overflow: hidden;
      }

       [${this.selector}] > div > div {
      }
    `;

    style.textContent = styleString;
    document.head.append(style);
  }
}

// ------------------------------ init
new StaggerText("data-a-split");

// ------------------------------ Helpers
function returnSplit(el) {
  console.log(el.dataset.aSplit);
  switch (el.dataset.aSplit) {
    case "char":
      return splitChars(splitWords(el));
    case "word":
      splitWords;
      return splitWords(splitWords(el));
    case "line":
      return splitLines(splitLines(el));
    default:
      return splitWords(splitWords(el));
  }
}

function splitChars(el) {
  return new SplitType(el, {
    types: "chars",
  }).chars;
}

function splitWords(el) {
  return new SplitType(el, {
    types: "words",
  }).words;
}

function splitLines(el) {
  return new SplitType(el, {
    types: "lines",
  }).lines;
}
