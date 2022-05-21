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
   * @param {string | BoxElement | HTMLElement} childs Received child for append to parent
   */
  addChilds(childs) {
    if (typeof childs === "string") {
      // this.core.innerHTML = childs;
      this.core.insertAdjacentHTML("beforeend", childs);
      return;
    }
    if (Array.isArray(childs)) {
      childs.forEach((child) => {
        if (child instanceof BoxElement) {
          this.core.appendChild(child.core);
        } else if (child instanceof HTMLElement) {
          this.core.appendChild(child);
        }
      });
    } else {
      if (childs instanceof BoxElement) {
        this.core.appendChild(childs.core);
      } else if (childs instanceof HTMLElement) {
        this.core.appendChild(childs);
      }
    }
  }

  /**
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

  /**
   * @param {Function} cb Callback for add event and add method removeClick
   */
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

  /**
   *
   * @param {string} type ClassList type: `add | remove `
   * @param {string} classNames Array of the classes
   */
  class(type = "add", classNames) {
    if (!classNames) return;
    switch (type) {
      case "add":
        classNames.split(" ").forEach((clase) => {
          this.core.classList.add(clase);
        });
        break;
      case "remove":
        classNames.split(" ").forEach((clase) => {
          this.core.classList.remove(clase);
        });
    }
  }

  /**
   * @param {boolean} isRewrite It is a boolean that indicates if the  content of the text is rewrite
   * @param {string} text
   */
  text(isRewrite = false, text) {
    if (isRewrite) {
      this.core.textContent = text;
      console.log("Se reescribe", this.core.textContent);
    } else {
      this.core.textContent += text;
    }
  }
}

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
