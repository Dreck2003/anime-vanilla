class NewRouter {
  constructor() {
    this.pages = [];
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
   * @param {[{url:string,component:any}]} pages Array with
   * ```javascript
   *  {url:"/",component:any}
   * ```
   */
  routes(root, pages) {
    if (typeof root == "string") {
      this.root = document.getElementById(root);
    } else if (root instanceof HTMLElement) {
      this.root = root;
    }
    this.pages = pages;
    this.renderTemplate();
    window.onpopstate = () => {
      Router.renderTemplate();
    };
  }

  renderTemplate() {
    const path = window.location.pathname;
    const childrenLength = this.root.children.length;
    const pages = this.pages;

    for (let i = 0; i < pages.length; i++) {
      const { url, component } = pages[i];
      let element = null;
      if (component.core) {
        element = component.core;
      } else if (component.element) {
        element = component.element;
      } else {
        element = component;
      }

      if (url === path) {
        if (childrenLength) {
          // this.root.removeChild(this.root.children[0]);
          // this.root.appendChild(element);
          replace(this.root, element);
        } else {
          // this.root.appendChild(element);
          replace(this.root, element);
        }
        return true;
        // Ya se añadio el nodo hijo
      }
    }

    // Nimgun path matcheo con el path de la url, entonces buscamos el path por defecto:
    const findDefaultView = this.pages.find((page) => page.url === "*");

    //Si no existe el componente por defecto || 404:

    if (!findDefaultView) {
      if (childrenLength) {
        this.root.removeChild(this.root.children[0]);
      }
      return false;
    }
    const element = findDefaultView.component.element
      ? findDefaultView.component.element
      : findDefaultView.component;
    if (childrenLength) {
      replace(this.root, element);

      // this.root.removeChild(this.root.children[0]);
      // this.root.appendChild(element);
    } else {
      replace(this.root, element);

      // this.root.appendChild(element);
    }
  }
}

export const Router = new NewRouter();
const replace = (parent, node) => {
  const arrayChildren = Array.from(parent.children);
  if (!arrayChildren.length) {
    // Si el padre no tiene hijos entonces lo añadimos
    parent.appendChild(node);
    return;
  }
  // console.log("Estos son los hijos: ", arrayChildren);
  const index = arrayChildren.find((child) => child == node);
  // console.log("El hijo encontrado es: ", index);
  if (index) {
    parent.replaceChild(node, index);
  } else {
    parent.appendChild(node);
  }
};
