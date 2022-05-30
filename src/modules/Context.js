// import { Router } from "../modules/Router";
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
    // console.log("El nuevo estado es: ", newState);
    try {
      this.state = JSON.parse(JSON.stringify(newState));
    } catch (error) {
      throw new Error(`The new state cannot be parsed, ${error}`);
    }
    this.emitState();
    // console.log("Llamando al emitState");
  }

  emitState() {
    // const url = window.location.pathname;
    this.suscribes.forEach((suscribe) => {
      // console.log("El parent es: ", Router.root);

      // Aca vemos si esta en el dom
      if (suscribe.element) {
        // Si existe el elemento o no:

        const children = Array.from(
          document.getElementsByTagName(suscribe.element.tagName)
        );
        for (let i = 0; i < children.length; i++) {
          // suscribe.element == children[i];
          if (suscribe.element == children[i]) {
            // console.log("Ejecutamos el Change_View");
            suscribe.changeView(suscribe.props);
            // NewChangeView(suscribe, children[i]);
            return;
          }
        }
      }

      // Aca vemos si esta en el dom

      // const encountered = Router.pages.find((page) => {
      //   // console.log({ page, suscribe });
      //   return page.component == suscribe;
      // });
      // // console.log("El encountered: ", encountered);

      // if (encountered.url.includes("{")) {
      //   // Si la page continene una url => /card/{id}/{other}
      //   // Entonces no puede matchear correctamente, por lo que debemos
      //   // Asegurarnos que la verdadera url comience con la url del componente
      //   let slicePath = encountered.url.slice(0, encountered.url.indexOf("{"));
      //   // Verificamos que comience con ese inicio /card/ ...
      //   if (url.startsWith(slicePath)) {
      //     // Si de verdad comienza entonces si matchea
      //     console.log("ChangeView");
      //     NewChangeView(suscribe, encountered);
      //   }
      //   return;
      // }

      // if (encountered && (encountered.url === url || encountered.url === "*")) {
      //   // EXiste el componente en el router
      //   // console.log("Los hijos del padre: ", suscribe);
      //   // console.log("Se encontro el encountered : ", encountered);
      //   if (!suscribe.element) {
      //     return;
      //   }
      //   console.log("ChangeView");
      //   NewChangeView(suscribe, encountered);
      // }
    });
  }
}

// const NewChangeView = (suscribe, encountered) => {
//   const children = Array.from(suscribe.parent.children);
//   // console.log("Los props: ", {
//   //   component: encountered.component,
//   //   children,
//   // });
//   const childExist = children.find((child) => {
//     return child == encountered.component.element;
//   });
//   // Verificamos si el componente existe en el dom si no no se actualiza la vista!
//   if (childExist) {
//     // Ejecutamos el cambio
//     suscribe.changeView(suscribe.props);
//   }
// };
