import "../listCards.css";
// import { getChunkAnime } from "../../../services/laziLoading";

import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";
import { getChunkAnime } from "../../../services/laziLoading";
import { AnimeState } from "../../../state/animes";
import { appendCard } from "../../../helpers/ajax/TopAnime";
// Instanciamos un obervador:
const FListCards = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "list_app");

  const $title = DOM.create("h2");
  $title.text(true, "Mangas");

  const $containerCards = DOM.create("section");
  $containerCards.class("add", "grid");
  $containerCards.text(true, "Mangas");
  appendCard($containerCards.core, AnimeState.state.seeState.anime);
  getChunkAnime($containerCards.core, 2, "manga");

  // getChunkAnime($containerCards.core, 1);

  /* Container with title  */
  $wrapper.addChilds([$title, $containerCards]);
  return $wrapper.core;
};

const ListCardsMangas = new Component(FListCards);
AnimeState.suscribe(ListCardsMangas);

export default ListCardsMangas;
