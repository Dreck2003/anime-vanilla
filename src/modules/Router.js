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
   * @param {[{url:string,component:any,props?:{},callback?:()=>}]} pages Array with
   * ```javascript
   *  {url:"/",component:any,props?:{},callback?:()=>}
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
    // console.log("Llamando a render template!");
    const childrenLength = this.root.children.length;
    const pages = this.pages;
    for (let i = 0; i < pages.length; i++) {
      const { url, component, props, callback } = pages[i];
      // Si la ruta tiene una variable en la url: /card/{id}...
      // Debemos buscar el que comienze con el inicio: /[card]/{id} => card

      if (url.includes("{")) {
        const init = url.indexOf("{");
        const slicePath = url.slice(0, init);
        if (path.startsWith(slicePath)) {
          // Si la url comienza con el corte del path: "../card/{id}".startWith("/card/");
          // Ejecutamos el callback si existe:
          // console.log(("La url matchea con:  ", { path, slicePath }));
          callback && callback();

          // Verificamos si el callback cambio la url
          let isUrlCahnge = window.location.pathname;
          // Si es diferente ejecutamos recursivamente renderTemplate()
          if (isUrlCahnge !== path) {
            console.log(
              "El callback cambio la url, entonces volvemos a ejecutar el render"
            );
            this.renderTemplate();
            return;
          }

          let element = {};
          // console.log("Antes de ejecutar el element: ", this.root);
          if (Object.hasOwnProperty.call(component, "core")) {
            element = component.core;
          } else if (Object.hasOwnProperty.call(component, "element")) {
            element = component.render(this.root, props);
          } else {
            element = component;
          }
          // console.log("Llamando al replace"); // Hasta aqui ya se incluyó
          replace(this.root, element, this.childs.length);
          return;
        }
        // Si no comienza entonces seguimos buscando
        continue;
      }

      if (url === path) {
        // if (childrenLength) {
        //   // Si tiene hijos:
        //   replace(this.root, element, this.childs.length);
        // } else {
        let element = {};
        if (Object.hasOwnProperty.call(component, "core")) {
          element = component.core;
        } else if (Object.hasOwnProperty.call(component, "element")) {
          element = component.render(this.root, props);
        } else {
          element = component;
        }
        replace(this.root, element, this.childs.length);
        // }
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
      // console.log("Llamando al replace");
      replace(this.root, element, this.childs.length);
    } else {
      // console.log("Llamando al replace");
      replace(this.root, element, this.childs.length);
    }
  }
}

export const Router = new NewRouter();
const replace = (parent, node, childs) => {
  const arrayChildren = Array.from(parent.children).slice(childs);
  if (!arrayChildren.length) {
    // Si el padre no tiene hijos entonces lo añadimos
    parent.appendChild(node);
    return;
  }
  const index = arrayChildren.find((child) => {
    console.log(
      "Comparamos el nodo a añadir y a los hijos despues de los añadidos: ",
      { child, node }
    );
    return child == node;
  });
  // debugger;
  arrayChildren.forEach((child) => {
    console.log("Se borran el hijos: ", child);
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
