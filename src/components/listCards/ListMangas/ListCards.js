import "../listCards.css";
// import { getChunkAnime } from "../../../services/laziLoading";

import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";
import { getChunkAnime } from "../../../services/laziLoading";
// Instanciamos un obervador:
const FListCards = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "list_app");

  const $title = DOM.create("h2");
  $title.text(true, "Mangas");

  const $containerCards = DOM.create("section");
  $containerCards.class("add", "grid");
  $containerCards.text(true, "Mangas");
  getChunkAnime($containerCards.core, 1, "manga");

  // getChunkAnime($containerCards.core, 1);

  /* Container with title  */
  $wrapper.addChilds([$title, $containerCards]);
  return $wrapper.core;
};

const ListCardsMangas = new Component(FListCards);

export default ListCardsMangas;
