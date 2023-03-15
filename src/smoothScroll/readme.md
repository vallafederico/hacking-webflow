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

Is exposed to the window object as `window.SmoothScroll`

#### Params

| Attribute            | Values                               | Default                                          | \*      | Description                                            |
| :------------------- | :----------------------------------- | :----------------------------------------------- | :------ | :----------------------------------------------------- |
| **data-id-scroll**   |                                      |                                                  | **YEP** |                                                        |
| data-duration        | `{NUMBER}` float or int (s)          | 1                                                |         | Duration                                               |
| data-easing          | `{FUNCTION}` (as STRING)             | (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 \* t)) |         | Easing Function                                        |
| data-orientation     | `{STRING}` "vertical" / "horizontal" | "vertical"                                       |         | Direction                                              |
| data-smoothWheel     | `{BOLEAN}` true / false              | true                                             |         | Wheel Smoothing                                        |
| data-smoothTouch     | `{BOLEAN}` true / false              | false                                            |         | Touch Smoothing                                        |
| data-touchMultiplier | `{NUMBER}` float or int (s)          | 1.5                                              |         | Touch Multiplier                                       |
| data-useOverscroll   | `{BOLEAN}` true / false              | true                                             |         | Use overscroll selectors                               |
| data-useControls     | `{BOLEAN}` true / false              | true                                             |         | .                                                      |
| data-useAnchor       | `{BOLEAN}` true / false              | true                                             |         | Use anchor point                                       |
| data-useRaf          | `{BOLEAN}` true / false              | true                                             |         | Expose RAF function to webflow and activate parameters |

<!-- #### Long Description -->

#### data-easing

You can get more from [easings.net](https://easings.net/)

#### data-useOverscroll

If set to `true`, you can use the following attribute to automatically solve the overscroll behaviour on elements that shouldn't scroll with the reast of the page.

```html
data-scroll="overscroll"
```

#### data-useControls

If set to `true`, you can use the following attributes to enable controls.
**Stop** to have a stop trigger, **Start** to start the scroll, **Toggle** to toggle play and pause

| Attribute   | Value  | Descripotion |
| :---------- | :----- | :----------- |
| data-scroll | stop   |              |
| data-scroll | start  |              |
| data-scroll | toggle |              |

#### data-useAnchor

| Attribute       | Value        | Descripotion |
| :-------------- | :----------- | :----------- |
| data-scrolllink | `{SELECTOR}` |              |

#### data-useRaf

Exposes `renderWebflow()`: a Request Animation Frame function on the webflow side.

And activates the following params

```js
this.y = scroll || 0;
this.max = limit || window.innerHeight;
this.speed = velocity || 0;
this.percent = progress || 0;
this.direction = 0;
```

### Configuration Example

Attach config parameters to the script tag (example below)

```html
<script
  data-id-scroll
  data-autoinit="true"
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

| Version # | Changes                                              |
| --------- | ---------------------------------------------------- |
| #00       | Test version, probably unstable and a bit messed up. |
