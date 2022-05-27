import { Router } from "../modules/Router";
export class Context {
  /**
   *
   * @param {{}} globalState Properties in state
   */
  constructor(globalState) {
    this.state = globalState;
    this.suscribes = [];
  }

  suscribe(component) {
    this.suscribes.push(component); // alamcena las funciones => setState(props);
  }

  /**
   *
   * @param {(state)=>newState} callback Function that return newState
   */
  dispatch(callback) {
    const newState = callback(this.state);
    try {
      this.state = JSON.parse(JSON.stringify(newState));
    } catch (error) {
      throw new Error(`The new state cannot be parsed, ${error}`);
    }
    this.emitState();
  }

  emitState() {
    const url = window.location.pathname;
    // console.log(this.suscribes);
    this.suscribes.forEach((suscribe) => {
      // console.log(suscribe);
      const encountered = Router.pages.find(
        (page) => page.component == suscribe
      );

      if (encountered && (encountered.url === url || encountered.url === "*")) {
        // EXiste el componente en el router
        // console.log("Los hijos del padre: ", suscribe);
        if (!suscribe.element) {
          return;
        }
        const children = Array.from(suscribe.parent.children);
        // console.log("Los props: ", {
        //   component: encountered.component,
        //   children,
        // });
        const childExist = children.find((child) => {
          // console.log("El componente: ", encountered.component);
          // console.log("Los hijos del dom: ", child);

          return child == encountered.component.element;
        });
        // Verificamos si el componente existe en el dom si no no se actualiza la vista!
        if (childExist) {
          // Ejecutamos el cambio
          suscribe.changeView(suscribe.props);
        }
      }
    });
  }
}
