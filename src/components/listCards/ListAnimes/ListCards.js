import "../listCards.css";
import { getChunkAnime } from "../../../services/laziLoading";

import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";

// Instanciamos un obervador:
const FListCards = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "list_app");

  const $title = DOM.create("h2");
  $title.text(true, "Animes");

  const $containerCards = DOM.create("section");
  $containerCards.class("add", "grid");
  $containerCards.text(true, "Animes");
  getChunkAnime($containerCards.core, 1, "anime");

  /* Container with title  */
  $wrapper.addChilds([$title, $containerCards]);
  return $wrapper.core;
};

const ListCardsAnimes = new Component(FListCards);

export default ListCardsAnimes;
