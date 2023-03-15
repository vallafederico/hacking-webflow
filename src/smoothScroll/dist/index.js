(() => {
  // ../util/live-reload.js
  new EventSource(`http://localhost:${8e3}/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // node_modules/.pnpm/nanoevents@6.0.2/node_modules/nanoevents/index.js
  var createNanoEvents = () => ({
    events: {},
    emit(event, ...args) {
      ;
      (this.events[event] || []).forEach((i2) => i2(...args));
    },
    on(event, cb) {
      ;
      (this.events[event] = this.events[event] || []).push(cb);
      return () => this.events[event] = (this.events[event] || []).filter((i2) => i2 !== cb);
    }
  });

  // node_modules/.pnpm/@studio-freight+lenis@1.0.0/node_modules/@studio-freight/lenis/dist/lenis.modern.mjs
  function e(t, e2, i2) {
    return Math.max(t, Math.min(e2, i2));
  }
  var i = class {
    advance(t) {
      var i2;
      if (!this.isRunning)
        return;
      let s2 = false;
      if (this.lerp)
        this.value = (1 - (o2 = this.lerp)) * this.value + o2 * this.to, Math.round(this.value) === this.to && (this.value = this.to, s2 = true);
      else {
        this.currentTime += t;
        const i3 = e(0, this.currentTime / this.duration, 1);
        s2 = i3 >= 1;
        const o3 = s2 ? 1 : this.easing(i3);
        this.value = this.from + (this.to - this.from) * o3;
      }
      var o2;
      null == (i2 = this.onUpdate) || i2.call(this, this.value, { completed: s2 }), s2 && this.stop();
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t, e2, { lerp: i2 = 0.1, duration: s2 = 1, easing: o2 = (t2) => t2, onUpdate: n2 }) {
      this.from = this.value = t, this.to = e2, this.lerp = i2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, this.onUpdate = n2;
    }
  };
  var s = class {
    constructor(t) {
      this.onResize = ([t2]) => {
        if (t2) {
          const { width: e2, height: i2 } = t2.contentRect;
          this.width = e2, this.height = i2;
        }
      }, this.onWindowResize = () => {
        this.width = window.innerWidth, this.height = window.innerHeight;
      }, this.element = t, t === window ? (window.addEventListener("resize", this.onWindowResize), this.onWindowResize()) : (this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.element));
    }
    destroy() {
      window.removeEventListener("resize", this.onWindowResize), this.resizeObserver.disconnect();
    }
  };
  var o = class {
    constructor(i2, { wheelMultiplier: s2 = 1, touchMultiplier: o2 = 2, normalizeWheel: n2 = false }) {
      this.onTouchStart = (t) => {
        const { pageX: e2, pageY: i3 } = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStart.x = e2, this.touchStart.y = i3;
      }, this.onTouchMove = (t) => {
        const { pageX: e2, pageY: i3 } = t.targetTouches ? t.targetTouches[0] : t, s3 = -(e2 - this.touchStart.x) * this.touchMultiplier, o3 = -(i3 - this.touchStart.y) * this.touchMultiplier;
        this.touchStart.x = e2, this.touchStart.y = i3, this.emitter.emit("scroll", { type: "touch", deltaX: s3, deltaY: o3, event: t });
      }, this.onWheel = (t) => {
        let { deltaX: i3, deltaY: s3 } = t;
        this.normalizeWheel && (i3 = e(-100, i3, 100), s3 = e(-100, s3, 100)), i3 *= this.wheelMultiplier, s3 *= this.wheelMultiplier, this.emitter.emit("scroll", { type: "wheel", deltaX: i3, deltaY: s3, event: t });
      }, this.element = i2, this.wheelMultiplier = s2, this.touchMultiplier = o2, this.normalizeWheel = n2, this.touchStart = { x: null, y: null }, this.emitter = createNanoEvents(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false });
    }
    on(t, e2) {
      return this.emitter.on(t, e2);
    }
    destroy() {
      this.emitter.events = {}, this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false });
    }
  };
  var n = class {
    constructor({ direction: e2, gestureDirection: n2, mouseMultiplier: l, smooth: r, wrapper: h = window, content: a = document.documentElement, smoothWheel: c = null == r || r, smoothTouch: u = false, duration: m, easing: p = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), lerp: d = m ? null : 0.1, infinite: g = false, orientation: v = null != e2 ? e2 : "vertical", gestureOrientation: S = null != n2 ? n2 : "vertical", touchMultiplier: w = 2, wheelMultiplier: f = null != l ? l : 1, normalizeWheel: M = true } = {}) {
      this.onVirtualScroll = ({ type: t, deltaX: e3, deltaY: i2, event: s2 }) => {
        if (s2.ctrlKey)
          return;
        if ("vertical" === this.options.gestureOrientation && 0 === i2 || "horizontal" === this.options.gestureOrientation && 0 === e3)
          return;
        if (s2.composedPath().find((t2) => null == t2 || null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent")))
          return;
        if (this.isStopped || this.isLocked)
          return void s2.preventDefault();
        if (this.isSmooth = this.options.smoothTouch && "touch" === t || this.options.smoothWheel && "wheel" === t, !this.isSmooth)
          return this.isScrolling = false, void this.animate.stop();
        s2.preventDefault();
        let o2 = i2;
        "both" === this.options.gestureOrientation ? o2 = Math.abs(i2) > Math.abs(e3) ? i2 : e3 : "horizontal" === this.options.gestureOrientation && (o2 = e3), this.scrollTo(this.targetScroll + o2, { programmatic: false });
      }, this.onScroll = () => {
        if (!this.isScrolling) {
          const t = this.animatedScroll;
          this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t), this.emit();
        }
      }, e2 && console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"), n2 && console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"), l && console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"), r && console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"), window.lenisVersion = "1.0.0-dev.8", h !== document.documentElement && h !== document.body || (h = window), this.options = { wrapper: h, content: a, smoothWheel: c, smoothTouch: u, duration: m, easing: p, lerp: d, infinite: g, gestureOrientation: S, orientation: v, touchMultiplier: w, wheelMultiplier: f, normalizeWheel: M }, this.wrapper = new s(h), this.content = new s(a), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = false, this.isSmooth = c || u, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new i(), this.emitter = createNanoEvents(), this.wrapper.element.addEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll = new o(h, { touchMultiplier: w, wheelMultiplier: f, normalizeWheel: M }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
      this.emitter.events = {}, this.wrapper.element.removeEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll.destroy();
    }
    on(t, e2) {
      return this.emitter.on(t, e2);
    }
    off(t, e2) {
      var i2;
      this.emitter.events[t] = null == (i2 = this.emitter.events[t]) ? void 0 : i2.filter((t2) => e2 !== t2);
    }
    setScroll(t) {
      this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      this.isLocked = false, this.isScrolling = false, this.velocity = 0;
    }
    start() {
      this.isStopped = false, this.reset();
    }
    stop() {
      this.isStopped = true, this.animate.stop(), this.reset();
    }
    raf(t) {
      const e2 = t - (this.time || t);
      this.time = t, this.animate.advance(1e-3 * e2);
    }
    scrollTo(t, { offset: i2 = 0, immediate: s2 = false, lock: o2 = false, duration: n2 = this.options.duration, easing: l = this.options.easing, lerp: r = !n2 && this.options.lerp, onComplete: h, force: a = false, programmatic: c = true } = {}) {
      if (!this.isStopped || a) {
        if (["top", "left", "start"].includes(t))
          t = 0;
        else if (["bottom", "right", "end"].includes(t))
          t = this.limit;
        else {
          var u;
          let e2;
          if ("string" == typeof t ? e2 = document.querySelector(t) : null != (u = t) && u.nodeType && (e2 = t), e2) {
            if (this.wrapper.element !== window) {
              const t2 = this.wrapper.element.getBoundingClientRect();
              i2 -= this.isHorizontal ? t2.left : t2.top;
            }
            const s3 = e2.getBoundingClientRect();
            t = (this.isHorizontal ? s3.left : s3.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t) {
          if (t += i2, t = Math.round(t), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t = e(0, t, this.limit), s2)
            return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.animate.stop(), this.reset(), this.emit(), void (null == h || h());
          c || (this.targetScroll = t), this.animate.fromTo(this.animatedScroll, t, { duration: n2, easing: l, lerp: r, onUpdate: (t2, { completed: e2 }) => {
            o2 && (this.isLocked = true), this.isScrolling = true, this.velocity = t2 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t2, this.setScroll(this.scroll), c && (this.targetScroll = t2), e2 && (o2 && (this.isLocked = false), requestAnimationFrame(() => {
              this.isScrolling = false;
            }), this.velocity = 0, null == h || h()), this.emit();
          } });
        }
      }
    }
    get rootElement() {
      return this.wrapper.element === window ? this.content.element : this.wrapper.element;
    }
    get limit() {
      return Math.round(this.isHorizontal ? this.content.width - this.wrapper.width : this.content.height - this.wrapper.height);
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? function(t, e2) {
        let i2 = t % e2;
        return (e2 > 0 && i2 < 0 || e2 < 0 && i2 > 0) && (i2 += e2), i2;
      }(this.animatedScroll, this.limit) : this.animatedScroll;
    }
    get progress() {
      return this.scroll / this.limit;
    }
    get isSmooth() {
      return this.__isSmooth;
    }
    set isSmooth(t) {
      this.__isSmooth !== t && (this.rootElement.classList.toggle("lenis-smooth", t), this.__isSmooth = t);
    }
    get isScrolling() {
      return this.__isScrolling;
    }
    set isScrolling(t) {
      this.__isScrolling !== t && (this.rootElement.classList.toggle("lenis-scrolling", t), this.__isScrolling = t);
    }
    get isStopped() {
      return this.__isStopped;
    }
    set isStopped(t) {
      this.__isStopped !== t && (this.rootElement.classList.toggle("lenis-stopped", t), this.__isStopped = t);
    }
  };

  // ../util/injectCSS.js
  function injectCSS(string) {
    const style = document.createElement("style");
    style.textContent = string;
    document.head.append(style);
  }

  // ../util/webflow.js
  function handleEditor(onEditorView) {
    const html = document.documentElement;
    const config = { attributes: true, childList: false, subtree: false };
    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          [
            ...document.querySelectorAll(
              ".w-editor-bem-EditSiteButton , .w-editor-bem-EditorMainMenu"
            )
          ].forEach((item) => {
            item.onclick = () => {
              onEditorView();
            };
          });
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(html, config);
  }

  // ../util/eval.js
  function isArrowFunction(str) {
    const arrowFunctionRegex = /^(\s*[(]?[a-zA-Z0-9\s,]*[)]?\s*=>\s*{?\s*[\s\S]*}?)/;
    return arrowFunctionRegex.test(str);
  }
  function evalConfig(selector, defaults = {}) {
    const data = document.querySelector(selector).dataset;
    const out = { ...data };
    for (const item in out) {
      const value = out[item];
      if (value === "" || value === " ") {
      } else if (!isNaN(value)) {
        out[item] = +value;
      } else if (value === "true" || value === "false") {
        if (value === "true") {
          out[item] = true;
        } else
          out[item] = false;
      } else if (isArrowFunction(value)) {
        out[item] = new Function(`return ${value};`)();
      } else {
        out[item] = value;
      }
    }
    return { ...defaults, ...out };
  }

  // index.js
  var customcss = injectCSS(`
    .lenis.lenis-smooth {
      scroll-behavior: auto;  
    }
    html.lenis {
      height: auto;
    }
`);
  var Scroll = class extends n {
    constructor(params2) {
      super({
        params: params2
      });
      this.params = params2;
      this.isActive = true;
      this.init();
    }
    init() {
      this.config();
      this.render();
      if (this.params.useRaf) {
        this.y = window.scrollY;
        this.max = window.innerHeight;
        this.speed = 0;
        this.percent = this.y / (document.body.scrollHeight - window.innerHeight);
        this.direction = 0;
        this.on("scroll", (e2) => this.outScroll(e2));
      }
      handleEditor(this.destroy);
    }
    config() {
      if (this.params.useAnchor)
        [...document.querySelectorAll("[data-scrolllink]")].forEach((item) => {
          const target = document.querySelector(item.dataset.scrolllink);
          if (target)
            item.addEventListener("click", () => {
              this.scrollTo(target);
            });
        });
      if (this.params.useOverscroll)
        [...document.querySelectorAll('[data-scroll="overscroll"]')].forEach(
          (item) => item.setAttribute("onwheel", "event.stopPropagation()")
        );
      if (this.params.useControls) {
        [...document.querySelectorAll('[data-scroll="stop"]')].forEach((item) => {
          item.onclick = () => {
            this.stop();
            this.isActive = false;
          };
        });
        [...document.querySelectorAll('[data-scroll="start"]')].forEach(
          (item) => {
            item.onclick = () => {
              this.start();
              this.isActive = true;
            };
          }
        );
        [...document.querySelectorAll('[data-scroll="toggle"]')].forEach(
          (item) => {
            item.onclick = () => {
              if (this.isActive) {
                this.stop();
                this.isActive = false;
              } else {
                this.start();
                this.isActive = true;
              }
            };
          }
        );
      }
    }
    render(time) {
      this.raf(time);
      window.requestAnimationFrame(this.render.bind(this));
      if (this.params.useRaf)
        this.renderWebflow(time);
    }
    outScroll({ scroll, limit, velocity, progress, direction }) {
      this.y = scroll || 0;
      this.max = limit || window.innerHeight;
      this.speed = velocity || 0;
      this.percent = progress || 0;
      this.direction = 0;
    }
    renderWebflow(t) {
    }
  };
  var params = evalConfig("[data-id-scroll]", {
    // defaults
    duration: 1.5,
    easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    // https://easings.net
    orientation: "vertical",
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    // internal
    useOverscroll: true,
    useControls: true,
    useAnchor: true,
    useRaf: true
  });
  window.SmoothScroll = new Scroll(params);
})();
//# sourceMappingURL=index.js.map
