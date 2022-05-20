import { Router } from "./Router";

export class BoxElement {
  core = null;
  initialStyles = null;
  newStyles = null;

  constructor(type) {
    this.core = document.createElement(type);
    this.initialStyles = this.core.style;
    this.newStyles = {};
  }

  /**
   *
   * @param {string | BoxElement | HTMLElement} child Received child for append to parent
   */
  addChild(child) {
    if (typeof child === "string") {
      this.core.innerHTML = child;
    } else if (child instanceof BoxElement) {
      this.core.appendChild(child.core);
    } else if (child instanceof HTMLElement) {
      this.core.appendChild(child);
    }
  }

  /**
   *
   * @param {any} styles Received object with `css properties`
   */
  addStyles(styles) {
    for (let key in styles) {
      this.core.style[key] = styles[key];
    }
    this.newStyles = {
      ...this.newStyles,
      ...styles,
    };
  }

  addClick(cb) {
    const evento = cb;
    this.core.addEventListener("click", evento);

    this.removeClick = function () {
      this.core.removeEventListener("click", evento);
    };
  }

  hover(isReset = true, callback) {
    let oldStyles = this.newStyles;

    if (isReset) {
      this.core.addEventListener("mouseover", callback);
      this.core.addEventListener("mouseout", (event) => {
        event.preventDefault();
        if (oldStyles) {
          this.addStyle(oldStyles);
        } else {
          this.core.style = this.initialStyles;
        }
      });
    } else {
      this.core.addEventListener("mouseover", callback);
    }
  }
}

// class Link extends BoxElement {
//   constructor(type) {
//     super(type);
//   }

//   to(URL) {
//     this.core.addEventListener("click", (event) => {
//       event.preventDefault();
//       Router.navigate(URL);
//     });
//   }
// }

export class DOM {
  static create(type) {
    if (typeof type !== "string") {
      throw new Error("The type must be string");
    }
    return new BoxElement(type.toUpperCase());
  }

  static link(URL) {
    const newAnchor = new BoxElement("A");
    newAnchor.core.href = URL;
    newAnchor.addClick((event) => {
      {
        event.preventDefault();
        Router.navigate(URL);
      }
    });
    return newAnchor;
  }
}
