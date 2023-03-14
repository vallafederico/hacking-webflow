(() => {
  var L = () => ({
    events: {},
    emit(l, ...t) {
      (this.events[l] || []).forEach((e) => e(...t));
    },
    on(l, t) {
      return (
        (this.events[l] = this.events[l] || []).push(t),
        () => (this.events[l] = (this.events[l] || []).filter((e) => e !== t))
      );
    },
  });
  function w(l, t, e) {
    return Math.max(l, Math.min(t, e));
  }
  var z = class {
      advance(t) {
        var e;
        if (!this.isRunning) return;
        let s = !1;
        if (this.lerp)
          (this.value = (1 - (o = this.lerp)) * this.value + o * this.to),
            Math.round(this.value) === this.to &&
              ((this.value = this.to), (s = !0));
        else {
          this.currentTime += t;
          let i = w(0, this.currentTime / this.duration, 1);
          s = i >= 1;
          let n = s ? 1 : this.easing(i);
          this.value = this.from + (this.to - this.from) * n;
        }
        var o;
        (e = this.onUpdate) == null ||
          e.call(this, this.value, { completed: s }),
          s && this.stop();
      }
      stop() {
        this.isRunning = !1;
      }
      fromTo(
        t,
        e,
        { lerp: s = 0.1, duration: o = 1, easing: i = (r) => r, onUpdate: n }
      ) {
        (this.from = this.value = t),
          (this.to = e),
          (this.lerp = s),
          (this.duration = o),
          (this.easing = i),
          (this.currentTime = 0),
          (this.isRunning = !0),
          (this.onUpdate = n);
      }
    },
    y = class {
      constructor(t) {
        (this.onResize = ([e]) => {
          if (e) {
            let { width: s, height: o } = e.contentRect;
            (this.width = s), (this.height = o);
          }
        }),
          (this.onWindowResize = () => {
            (this.width = window.innerWidth),
              (this.height = window.innerHeight);
          }),
          (this.element = t),
          t === window
            ? (window.addEventListener("resize", this.onWindowResize),
              this.onWindowResize())
            : ((this.width = this.element.offsetWidth),
              (this.height = this.element.offsetHeight),
              (this.resizeObserver = new ResizeObserver(this.onResize)),
              this.resizeObserver.observe(this.element));
      }
      destroy() {
        window.removeEventListener("resize", this.onWindowResize),
          this.resizeObserver.disconnect();
      }
    },
    T = class {
      constructor(
        t,
        {
          wheelMultiplier: e = 1,
          touchMultiplier: s = 2,
          normalizeWheel: o = !1,
        }
      ) {
        (this.onTouchStart = (i) => {
          let { pageX: n, pageY: r } = i.targetTouches ? i.targetTouches[0] : i;
          (this.touchStart.x = n), (this.touchStart.y = r);
        }),
          (this.onTouchMove = (i) => {
            let { pageX: n, pageY: r } = i.targetTouches
                ? i.targetTouches[0]
                : i,
              h = -(n - this.touchStart.x) * this.touchMultiplier,
              c = -(r - this.touchStart.y) * this.touchMultiplier;
            (this.touchStart.x = n),
              (this.touchStart.y = r),
              this.emitter.emit("scroll", {
                type: "touch",
                deltaX: h,
                deltaY: c,
                event: i,
              });
          }),
          (this.onWheel = (i) => {
            let { deltaX: n, deltaY: r } = i;
            this.normalizeWheel &&
              ((n = w(-100, n, 100)), (r = w(-100, r, 100))),
              (n *= this.wheelMultiplier),
              (r *= this.wheelMultiplier),
              this.emitter.emit("scroll", {
                type: "wheel",
                deltaX: n,
                deltaY: r,
                event: i,
              });
          }),
          (this.element = t),
          (this.wheelMultiplier = e),
          (this.touchMultiplier = s),
          (this.normalizeWheel = o),
          (this.touchStart = { x: null, y: null }),
          (this.emitter = L()),
          this.element.addEventListener("wheel", this.onWheel, { passive: !1 }),
          this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1,
          }),
          this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1,
          });
      }
      on(t, e) {
        return this.emitter.on(t, e);
      }
      destroy() {
        (this.emitter.events = {}),
          this.element.removeEventListener("wheel", this.onWheel, {
            passive: !1,
          }),
          this.element.removeEventListener("touchstart", this.onTouchStart, {
            passive: !1,
          }),
          this.element.removeEventListener("touchmove", this.onTouchMove, {
            passive: !1,
          });
      }
    },
    E = class {
      constructor({
        direction: t,
        gestureDirection: e,
        mouseMultiplier: s,
        smooth: o,
        wrapper: i = window,
        content: n = document.documentElement,
        smoothWheel: r = o == null || o,
        smoothTouch: h = !1,
        duration: c,
        easing: u = (p) => Math.min(1, 1.001 - Math.pow(2, -10 * p)),
        lerp: d = c ? null : 0.1,
        infinite: a = !1,
        orientation: m = t != null ? t : "vertical",
        gestureOrientation: g = e != null ? e : "vertical",
        touchMultiplier: A = 2,
        wheelMultiplier: _ = s != null ? s : 1,
        normalizeWheel: k = !0,
      } = {}) {
        (this.onVirtualScroll = ({
          type: p,
          deltaX: v,
          deltaY: S,
          event: f,
        }) => {
          if (
            f.ctrlKey ||
            (this.options.gestureOrientation === "vertical" && S === 0) ||
            (this.options.gestureOrientation === "horizontal" && v === 0) ||
            f
              .composedPath()
              .find((b) =>
                b == null || b.hasAttribute == null
                  ? void 0
                  : b.hasAttribute("data-lenis-prevent")
              )
          )
            return;
          if (this.isStopped || this.isLocked) return void f.preventDefault();
          if (
            ((this.isSmooth =
              (this.options.smoothTouch && p === "touch") ||
              (this.options.smoothWheel && p === "wheel")),
            !this.isSmooth)
          )
            return (this.isScrolling = !1), void this.animate.stop();
          f.preventDefault();
          let M = S;
          this.options.gestureOrientation === "both"
            ? (M = Math.abs(S) > Math.abs(v) ? S : v)
            : this.options.gestureOrientation === "horizontal" && (M = v),
            this.scrollTo(this.targetScroll + M, { programmatic: !1 });
        }),
          (this.onScroll = () => {
            if (!this.isScrolling) {
              let p = this.animatedScroll;
              (this.animatedScroll = this.targetScroll = this.actualScroll),
                (this.velocity = 0),
                (this.direction = Math.sign(this.animatedScroll - p)),
                this.emit();
            }
          }),
          t &&
            console.warn(
              "Lenis: `direction` option is deprecated, use `orientation` instead"
            ),
          e &&
            console.warn(
              "Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"
            ),
          s &&
            console.warn(
              "Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"
            ),
          o &&
            console.warn(
              "Lenis: `smooth` option is deprecated, use `smoothWheel` instead"
            ),
          (window.lenisVersion = "1.0.0-dev.8"),
          (i !== document.documentElement && i !== document.body) ||
            (i = window),
          (this.options = {
            wrapper: i,
            content: n,
            smoothWheel: r,
            smoothTouch: h,
            duration: c,
            easing: u,
            lerp: d,
            infinite: a,
            gestureOrientation: g,
            orientation: m,
            touchMultiplier: A,
            wheelMultiplier: _,
            normalizeWheel: k,
          }),
          (this.wrapper = new y(i)),
          (this.content = new y(n)),
          this.rootElement.classList.add("lenis"),
          (this.velocity = 0),
          (this.isStopped = !1),
          (this.isSmooth = r || h),
          (this.isScrolling = !1),
          (this.targetScroll = this.animatedScroll = this.actualScroll),
          (this.animate = new z()),
          (this.emitter = L()),
          this.wrapper.element.addEventListener("scroll", this.onScroll, {
            passive: !1,
          }),
          (this.virtualScroll = new T(i, {
            touchMultiplier: A,
            wheelMultiplier: _,
            normalizeWheel: k,
          })),
          this.virtualScroll.on("scroll", this.onVirtualScroll);
      }
      destroy() {
        (this.emitter.events = {}),
          this.wrapper.element.removeEventListener("scroll", this.onScroll, {
            passive: !1,
          }),
          this.virtualScroll.destroy();
      }
      on(t, e) {
        return this.emitter.on(t, e);
      }
      off(t, e) {
        var s;
        this.emitter.events[t] =
          (s = this.emitter.events[t]) == null
            ? void 0
            : s.filter((o) => e !== o);
      }
      setScroll(t) {
        this.isHorizontal
          ? (this.rootElement.scrollLeft = t)
          : (this.rootElement.scrollTop = t);
      }
      emit() {
        this.emitter.emit("scroll", this);
      }
      reset() {
        (this.isLocked = !1), (this.isScrolling = !1), (this.velocity = 0);
      }
      start() {
        (this.isStopped = !1), this.reset();
      }
      stop() {
        (this.isStopped = !0), this.animate.stop(), this.reset();
      }
      raf(t) {
        let e = t - (this.time || t);
        (this.time = t), this.animate.advance(0.001 * e);
      }
      scrollTo(
        t,
        {
          offset: e = 0,
          immediate: s = !1,
          lock: o = !1,
          duration: i = this.options.duration,
          easing: n = this.options.easing,
          lerp: r = !i && this.options.lerp,
          onComplete: h,
          force: c = !1,
          programmatic: u = !0,
        } = {}
      ) {
        if (!this.isStopped || c) {
          if (["top", "left", "start"].includes(t)) t = 0;
          else if (["bottom", "right", "end"].includes(t)) t = this.limit;
          else {
            var d;
            let a;
            if (
              (typeof t == "string"
                ? (a = document.querySelector(t))
                : (d = t) != null && d.nodeType && (a = t),
              a)
            ) {
              if (this.wrapper.element !== window) {
                let g = this.wrapper.element.getBoundingClientRect();
                e -= this.isHorizontal ? g.left : g.top;
              }
              let m = a.getBoundingClientRect();
              t = (this.isHorizontal ? m.left : m.top) + this.animatedScroll;
            }
          }
          if (typeof t == "number") {
            if (
              ((t += e),
              (t = Math.round(t)),
              this.options.infinite
                ? u && (this.targetScroll = this.animatedScroll = this.scroll)
                : (t = w(0, t, this.limit)),
              s)
            )
              return (
                (this.animatedScroll = this.targetScroll = t),
                this.setScroll(this.scroll),
                this.animate.stop(),
                this.reset(),
                this.emit(),
                void (h == null || h())
              );
            u || (this.targetScroll = t),
              this.animate.fromTo(this.animatedScroll, t, {
                duration: i,
                easing: n,
                lerp: r,
                onUpdate: (a, { completed: m }) => {
                  o && (this.isLocked = !0),
                    (this.isScrolling = !0),
                    (this.velocity = a - this.animatedScroll),
                    (this.direction = Math.sign(this.velocity)),
                    (this.animatedScroll = a),
                    this.setScroll(this.scroll),
                    u && (this.targetScroll = a),
                    m &&
                      (o && (this.isLocked = !1),
                      requestAnimationFrame(() => {
                        this.isScrolling = !1;
                      }),
                      (this.velocity = 0),
                      h == null || h()),
                    this.emit();
                },
              });
          }
        }
      }
      get rootElement() {
        return this.wrapper.element === window
          ? this.content.element
          : this.wrapper.element;
      }
      get limit() {
        return Math.round(
          this.isHorizontal
            ? this.content.width - this.wrapper.width
            : this.content.height - this.wrapper.height
        );
      }
      get isHorizontal() {
        return this.options.orientation === "horizontal";
      }
      get actualScroll() {
        return this.isHorizontal
          ? this.rootElement.scrollLeft
          : this.rootElement.scrollTop;
      }
      get scroll() {
        return this.options.infinite
          ? (function (t, e) {
              let s = t % e;
              return ((e > 0 && s < 0) || (e < 0 && s > 0)) && (s += e), s;
            })(this.animatedScroll, this.limit)
          : this.animatedScroll;
      }
      get progress() {
        return this.scroll / this.limit;
      }
      get isSmooth() {
        return this.__isSmooth;
      }
      set isSmooth(t) {
        this.__isSmooth !== t &&
          (this.rootElement.classList.toggle("lenis-smooth", t),
          (this.__isSmooth = t));
      }
      get isScrolling() {
        return this.__isScrolling;
      }
      set isScrolling(t) {
        this.__isScrolling !== t &&
          (this.rootElement.classList.toggle("lenis-scrolling", t),
          (this.__isScrolling = t));
      }
      get isStopped() {
        return this.__isStopped;
      }
      set isStopped(t) {
        this.__isStopped !== t &&
          (this.rootElement.classList.toggle("lenis-stopped", t),
          (this.__isStopped = t));
      }
    };
  var W = class extends E {
    constructor() {
      super({
        duration: 1.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: !0,
        smoothTouch: !1,
        touchMultiplier: 1.5,
      }),
        this.injectCSS(),
        (this.isActive = !0),
        this.init();
    }
    init() {
      this.config(), this.useAnchors(), this.render();
    }
    useAnchors() {
      [...document.querySelectorAll("[data-scrolllink]")].forEach((t) => {
        let e = document.querySelector(t.dataset.scrolllink);
        e &&
          t.addEventListener("click", () => {
            this.scrollTo(e);
          });
      });
    }
    config() {
      let t = [...document.querySelectorAll('[data-scroll="overscroll"]')];
      t.length > 0 &&
        t.forEach((i) => i.setAttribute("onwheel", "event.stopPropagation()"));
      let e = [...document.querySelectorAll('[data-scroll="stop"]')];
      e.length > 0 &&
        e.forEach((i) => {
          i.onclick = () => {
            this.stop(), (this.isActive = !1);
          };
        });
      let s = [...document.querySelectorAll('[data-scroll="start"]')];
      s.length > 0 &&
        s.forEach((i) => {
          i.onclick = () => {
            this.start(), (this.isActive = !0);
          };
        });
      let o = [...document.querySelectorAll('[data-scroll="toggle"]')];
      o.length > 0 &&
        o.forEach((i) => {
          i.onclick = () => {
            this.isActive
              ? (this.stop(), (this.isActive = !1))
              : (this.start(), (this.isActive = !0));
          };
        });
    }
    render(t) {
      this.raf(t),
        window.requestAnimationFrame(this.render.bind(this)),
        this.renderWebflow(t);
    }
    renderWebflow() {}
    handleEditorView() {
      let t = document.documentElement,
        e = { attributes: !0, childList: !1, subtree: !1 },
        s = (i, n) => {
          for (let r of i)
            if (r.type === "attributes") {
              let h = document.querySelector(".w-editor-bem-EditSiteButton"),
                c = document.querySelector(".w-editor-bem-EditorMainMenu"),
                u = (d) => d.addEventListener("click", () => this.destroy());
              h && u(h), c && u(c);
            }
        };
      new MutationObserver(s).observe(t, e);
    }
    injectCSS() {
      let t = document.createElement("style"),
        e = `
    .lenis.lenis-smooth {
        scroll-behavior: auto;  
    }
    html.lenis {
        height: auto;
    }
    `;
      (t.textContent = e), document.head.append(t);
    }
  };
  window.SmoothScroll = new W();
})();
