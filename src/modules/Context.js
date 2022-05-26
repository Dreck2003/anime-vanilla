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
    this.suscribes.forEach((suscribe) => {
      // console.log(suscribe);
      const encountered = Router.pages.find(
        (page) => page.component == suscribe
      );

      if (encountered && encountered.url === url) {
        // EXiste el componente en el router
        suscribe.changeView(suscribe.props);
      }
    });
  }
}
