# Smooth Scroll

Lenis implementation optimised for Webflow usage.

[**Cloneable**](/)

_Credits & Tools: [Lenis (Website)](https://lenis.studiofreight.com/), [Lenis (Github)](https://github.com/studio-freight/lenis)_

## Last Stable Version (minimal)

```html
<script data-useRaf="true" defer src="..."></script>
```

## How to

Above script tag goes in `before /body` Webflow tag.

Comes as a single package, so comes packed with all the tooling needed (Lenis and such). No need to include those as well.

The implementation needs nop attributes to work. If you want to apply custom configuration (you will need to add those to the script) you'll need at least the `data-id-scroll`

Needed CSS is added automatically, namely:

```css
.lenis.lenis-smooth {
  scroll-behavior: auto;
}
html.lenis {
  height: auto;
}
```

Is exposed to the window object as `window.SScroll`. Methods available are exposed through it under the `call` property, that you can access under `window.SScroll.call.{METHOD_NAME}()`

| Name                        | Description       |
| :-------------------------- | :---------------- |
| window.SScroll.call.start() | Starts the scroll |
| window.SScroll.call.stop()  | Stops the scroll  |

### Params

| Attribute            | Values                               | Default                                          | \*      | Description                                |
| :------------------- | :----------------------------------- | :----------------------------------------------- | :------ | :----------------------------------------- |
| **data-id-scroll**   |                                      |                                                  | **YEP** |                                            |
| data-duration        | `{NUMBER}` float or int (s)          | 1                                                |         | Duration                                   |
| data-easing          | `{FUNCTION}` (as STRING)             | (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 \* t)) |         | Easing Function                            |
| data-orientation     | `{STRING}` "vertical" / "horizontal" | "vertical"                                       |         | Direction                                  |
| data-smoothWheel     | `{BOLEAN}` true / false              | true                                             |         | Wheel Smoothing                            |
| data-smoothTouch     | `{BOLEAN}` true / false              | false                                            |         | Touch Smoothing                            |
| data-touchMultiplier | `{NUMBER}` float or int (s)          | 1.5                                              |         | Touch Multiplier                           |
| data-infinite        | `{BOLEAN}` true / false              | true                                             |         | Use Infinite Scroll                        |
| data-useOverscroll   | `{BOLEAN}` true / false              | true                                             |         | Use overscroll selectors                   |
| data-useControls     | `{BOLEAN}` true / false              | true                                             |         | .                                          |
| data-useAnchor       | `{BOLEAN}` true / false              | true                                             |         | Use anchor point                           |
| data-useRaf          | `{BOLEAN}` true / false              | true                                             |         | Activate parameters to be read from window |

<!-- #### Long Description -->

#### data-easing

You can get more from [easings.net](https://easings.net/)

#### data-useOverscroll

If set to `true`, you can use the following attribute to automatically solve the overscroll behaviour on elements that shouldn't scroll with the reast of the page.

| Attribute   | Value      | Description |
| :---------- | :--------- | :---------- |
| data-scroll | overscroll |             |

#### data-useControls

If set to `true`, you can use the following attributes to enable controls.
**Stop** to have a stop trigger, **Start** to start the scroll, **Toggle** to toggle play and pause

| Attribute   | Value  | Description |
| :---------- | :----- | :---------- |
| data-scroll | stop   |             |
| data-scroll | start  |             |
| data-scroll | toggle |             |

#### data-useAnchor

Attaches a scroll anchor link for the element that has it. As a selector you can use anything (an ID `#` will probably be best)

| Attribute       | Value        | Description |
| :-------------- | :----------- | :---------- |
| data-scrolllink | `{SELECTOR}` |             |

#### data-useRaf

Exposes the scroll event to be listened in the window object like in the example below. Attached to `e.detail` you can find all scroll parameters like

| Value             | Description                       |
| :---------------- | :-------------------------------- |
| `.detail.y`       | Y position in the page            |
| `.detail.max`     | Maximum scroll container height   |
| `.detail.speed`   | Scroll Speed                      |
| `.detail.percent` | 0 - 1 value of scroll in the page |

```js
window.addEventListener("sscroll", (e) => {
  console.log(e.detail);
});
```

### Configuration Example

Attach config parameters to the script tag (example below)

```html
<script
  data-id-scroll
  data-autoinit="true"
  data-wrapper="window"
  data-duration="1"
  data-orientation="vertical"
  data-smoothWheel="true"
  data-smoothTouch="false"
  data-touchMultiplier="1.5"
  data-easing="(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))"
  data-useOverscroll="true"
  data-useControls="true"
  data-useAnchor="true"
  data-useRaf="true"
  defer
  src="..."
></script>
```

---

# CHANGELOG

| Version # | Changes            |
| --------- | ------------------ |
| #00       | First Version. WIP |
