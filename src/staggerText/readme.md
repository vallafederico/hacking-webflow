# Stagger Text

Used and abused text stagger animation. Still cool for a year max.

[**Cloneable**](/)

_Credits & Tools: [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [GSAP](https://greensock.com/gsap/), [Split-type](https://github.com/lukePeavey/SplitType)_

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/vallafederico/hacking-webflow@master/dist/text-split.01.js"
></script>
```

## How to

Above script tag goes in `before /body` Webflow tag.

Comes as a single package, so comes packed with all the tooling needed (gsap and such). No need to include those as well.

The implementation needs at least one attribute `data-a-split` to work. All other params are not mandatory, and can be used only when more configuration is needed.

Needed CSS is added automatically, namely:

```css
[data-a-split] > div {
  overflow: hidden;
}
```

## Config

| Attribute        | Values                                                       | Default | Required \* | Description                    |
| :--------------- | :----------------------------------------------------------- | :------ | ----------: | :----------------------------- |
| **data-a-split** | **char/word/line**                                           | --      |     **YEP** | **How's the text being split** |
| data-a-duration  | `{NUMBER}` float or int (s)                                  | 1.2     |          -- | Animation duration             |
| data-a-each      | `{NUMBER}` float or int (s)                                  | 0.02    |          -- | Animation stagger value        |
| data-a-delay     | `{NUMBER}` float or int (s)                                  | 0       |          -- | Animation delay                |
| data-a-ease      | `{STRING}` from [gsap](https://greensock.com/docs/v2/Easing) | 0       |          -- | Animation delay                |
| data-a-from      | `{STRING}` "start" / "center" / "end"                        | start   |          -- | Stagger starting point         |
| data-obs-once    | true / false                                                 | false   |          -- | Play once every time           |
| data-obs-t       | `{NUMBER}` float or int  (0 to 1)                            | .2      |          -- | Intersection Observer Treshold |
| data-obs-m       | `{NUMBER}` px / `{NUMBER}` %                                 | 10px    |          -- | Intersection Observer Margin   |

##### Notes

When using GSAP easings please use the string version ie `expo.inOut`, `expo.out`, `slow.in`.

---

# CHANGELOG

| Version # | Changes                                              |
| --------- | ---------------------------------------------------- |
| #00       | Test version, probably unstable and a bit messed up. |
| #01       | Added easings config                                 |
| #02       | First proper one, fixed config string/number issue   |
