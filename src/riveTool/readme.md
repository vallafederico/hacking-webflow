# Rive Animation Tool (WIP)

Utility for [Rive](https://rive.app/) in Webflow.

[**Cloneable**](https://webflow.com/made-in-webflow/website/rive-tool)

_Credits & Tools: [Rive.app](https://rive.app/)_

#### Last Stable Version

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/vallafederico/hacking-webflow@master/dist/rive-tool.01.js"
></script>
```

## How to

Above script tag goes in `before /body` Webflow tag.
Comes as a single package, so comes packed with all the tooling needed (no need to link other packages).

The implementation needs two attributes to work `data-rive` (flag for the wrapper element, ideally a `div`) and `data-src` (path for the rive animation).
The code automatically adds a `canvas` as child of the div (for every instance) and sets the following CSS (only once):

```css
[data-rive] > canvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
```

## Config

| Attribute     | Values          | Default | Required \* | Description                   |
| :------------ | :-------------- | :------ | ----------: | :---------------------------- |
| **data-rive** | **--**          | --      |     **YEP** | **Element Flag**              |
| **data-src**  | `{STRING}` Path | --      |     **YEP** | **Animation path**            |
| data-machines | `{STRING}` Name | --      |          -- | State Machine Name to trigger |

##### Notes

If you want to host the animation in webflow you can rename the `{FILE_PATH}.riv` to `{FILE_PATH}.riv.txt` and upload the file as webflow asset. When used in the `-src` attribute works same as .riv file.

---

# CHANGELOG

| Version # | Changes                                           |
| --------- | ------------------------------------------------- |
| #00       | WIP Early test, only state machine with listeners |

#### Credits

[Cat Following Mouse](https://rive.app/community/3920-8202-cat-following-the-mouse/)
