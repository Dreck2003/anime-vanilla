// import { BoxElement } from "./Element";

export class Component {
  /**
   *
   * @param {Function} component function that return elementHTML
   */
  constructor(component) {
    this.parent = null;
    this.component = component; // funtion that return elementHTML component --> ()=> Element
    this.element = null; // elemento en cuestion
    this.props = null;
  }

  /**
   *
   * @param {HTMLElement | string} parent HTMLElement for add
   * @param {options} props Props for state to children
   * @returns `HTMLElement` The return of the function component
   */
  render(parent, props = null) {
    this.parent =
      typeof parent === "string" ? document.querySelector(parent) : parent;
    this.props = props;
    this.element = this.component(props);
    return this.element;
  }

  changeView() {
    const newElement = this.component(this.props);
    // console.log("EL padre de este objeto es: ", this.parent);
    this.parent.replaceChild(newElement, this.element);
    this.element = newElement;
  }
}
