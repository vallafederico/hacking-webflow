export function injectCSS(string) {
  const style = document.createElement("style");
  style.textContent = string;
  document.head.append(style);
}

/*
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

*/
