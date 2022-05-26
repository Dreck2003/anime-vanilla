import "../../../public/css/templates/listCards.component.css";

import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";

// Instanciamos un obervador:
const FListCards = ({ title, callback = () => {} }) => {
  const SeeFetch = (entries) => {
    // console.log({ entries, observer });
    // console.log("Se ejecuta: ", { entries, observer });
    const container = entries[entries.length - 1];
    const cards = container.target;
    if (container.isIntersecting) {
      console.log("Fue visto: ", cards);
      if (cards) {
        callback(cards);
      }
    }
  };

  const observer = new IntersectionObserver(SeeFetch, {});

  const $wrapper = DOM.create("main");
  $wrapper.class("add", "list_app");

  const $title = DOM.create("h2");
  $title.text(true, `${title}`);

  const $containerCards = DOM.create("section");
  $containerCards.class("add", "grid");
  $containerCards.text(true, `${title}`);
  observer.observe($containerCards.core);
  // $containerCards.addChilds(`
  //   <span>ESTO ES TEXTO NO?</span>
  // `);

  /* Container with title  */
  $wrapper.addChilds([$title, $containerCards]);
  return $wrapper.core;
};

const ListCards = new Component(FListCards);

export default ListCards;
