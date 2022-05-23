import "./anime.css";

import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";
import { Router } from "../../modules/Router";

const FAnime = ({ img, genres, name, id }) => {
  const $wrapper = DOM.create("li");
  $wrapper.class("add", "card_container");
  const $div = DOM.create("div");
  $div.addChilds(`<img src="${img}" alt="${name}"/>`);
  $div.class("add", "card_img");
  $div.addClick((event) => {
    event.preventDefault();
    Router.navigate(`/${id}`);
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
  const $link = DOM.link(`/${id}`);
  $link.text(true, `${name}`);
  $link.class("add", "anime_link ellipsis bold text-dark fs-300");
  $wrapper.addChilds($link);

  return $wrapper.core;
};

export default new Component(FAnime);
