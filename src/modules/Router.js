"use strict";

// import { Component } from "./ComponentFunc";
// import { BoxElement } from "./Element";

class NewRouter {
  constructor() {
    this.pages = [];
    this.childs = [];
    this.root = document.body;
  }

  /**
   * Navigate in the url for load html template,
   * ```javascript
   * Router.navigate('/ruta')
   * ```
   */
  navigate(URL) {
    history.pushState({ page: 1 }, "", URL);
    this.renderTemplate();
  }

  /**
   * @param {string | HTMLElement} root
   * @param {[{url:string,component:any}]} pages Array with
   * ```javascript
   *  {url:"/",component:any}
   * ```
   */
  routes(root, pages) {
    if (typeof root == "string") {
      this.root = document.querySelector(root);
    } else if (root instanceof HTMLElement) {
      this.root = root;
    }
    this.childs = Array.from(this.root.children);
    this.pages = pages ? pages : [];
    this.renderTemplate();
    window.onpopstate = () => {
      this.renderTemplate();
    };
  }

  renderTemplate() {
    const path = window.location.pathname; // Este es la url que renderiza el template
    console.log("Llamando a render template!");
    const childrenLength = this.root.children.length;
    const pages = this.pages;
    for (let i = 0; i < pages.length; i++) {
      const { url, component, props } = pages[i];
      let element = null;
      if (Object.hasOwnProperty.call(component, "core")) {
        element = component.core;
      } else if (Object.hasOwnProperty.call(component, "element")) {
        element = component.render(this.root, props);
      } else {
        element = component;
      }
      if (url === path) {
        if (childrenLength) {
          // Si tiene hijos:
          replace(this.root, element, this.childs.length);
        } else {
          replace(this.root, element, this.childs.length);
        }
        return true;
        // Ya se añadio el nodo hijo
      }
    }

    // Nimgun path matcheo con el path de la url, entonces buscamos el path por defecto:
    const findDefaultView = this.pages.find((page) => page.url === "*");

    //Si no existe el componente por defecto || 404:

    if (!findDefaultView) {
      if (!childrenLength) {
        this.root.removeChild(this.root.children[0]);
        // this.root.appendChild()
      } else {
        let children = Array.from(this.root.children).slice(this.childs.length);
        children.forEach((child) => {
          this.root.removeChild(child);
        });
      }
      return false;
    }
    const { component, props } = findDefaultView;

    let element = component;
    if (Object.hasOwnProperty.call(component, "core")) {
      element = component.core;
    } else if (Object.hasOwnProperty.call(component, "element")) {
      element = component.render(this.root, props);
    } else {
      element = component;
    }
    if (childrenLength) {
      replace(this.root, element, this.childs.length);

      // this.root.removeChild(this.root.children[0]);
      // this.root.appendChild(element);
    } else {
      replace(this.root, element, this.childs.length);

      // this.root.appendChild(element);
    }
  }
}

export const Router = new NewRouter();
const replace = (parent, node, childs) => {
  const arrayChildren = Array.from(parent.children).slice(childs);
  // debugger;

  if (!arrayChildren.length) {
    // Si el padre no tiene hijos entonces lo añadimos
    parent.appendChild(node);
    return;
  }
  const index = arrayChildren.find((child) => child == node);
  arrayChildren.forEach((child) => {
    parent.removeChild(child);
  });
  if (index) {
    parent.replaceChild(node, index);
  } else {
    parent.appendChild(node);
  }
};

/**
 *  El problema esta en que el router se queda con la copia anterior del componente
 */
