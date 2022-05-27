import "./anime.css";

import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";
import { Router } from "../../modules/Router";
import { getSingleCard } from "../../helpers/ajax/TopAnime";

const FAnime = ({ img, genres, name, id, type }) => {
  const $wrapper = DOM.create("li");
  $wrapper.class("add", "card_container");
  const $div = DOM.create("div");
  $div.addChilds(`<img src="${img}" alt="${name}"/>`);
  $div.class("add", "card_img");
  $div.addClick((event) => {
    event.preventDefault();
    getSingleCard(type, id);
    Router.navigate(`/card/${name}/${type}`);
  });

  let text = "";
  genres = genres.slice(0, 3);
  genres.map((gen) => {
    text += ` ${gen}`;
  });
  $wrapper.addChilds($div);
  $wrapper.addChilds(`
      <span class="ellipsis">${text}</span>
  `);
  const $link = DOM.link(`/card/${name}/${type}`);
  $link.addClick((event) => {
    event.preventDefault();
    getSingleCard(type, id);
    Router.navigate(`/card/${name}/${type}`);
  });
  $link.text(true, `${name}`);
  $link.class("add", "anime_link ellipsis bold text-dark fs-300");
  $wrapper.addChilds($link);

  return $wrapper.core;
};

export default new Component(FAnime);
