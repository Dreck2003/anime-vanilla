import "./anime.css";

import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";
import { Router } from "../../modules/Router";

const FAnime = ({ img, genres, name }) => {
  const $wrapper = DOM.create("li");
  $wrapper.class("add", "card_container");
  const $div = DOM.create("div");
  $div.addChilds(`<img src="${img}" alt="${name}"/>`);
  $div.class("add", "card_img");
  $div.addClick((event) => {
    event.preventDefault();
    Router.navigate(`/${name}`);
  });

  let text = "";
  genres = genres.slice(0, 3);
  genres.map((gen) => {
    text += ` ${gen}`;
  });
  $wrapper.addChilds($div);
  $wrapper.addChilds(`
    <div class="card_description">
      <span>${text}</span>
    </div>
  `);
  const $link = DOM.link(`/${name}`);
  $link.text(true, `${name}`);
  $link.class("add", "text-dark fs-300");
  $wrapper.addChilds($link);

  return $wrapper.core;
};

export default new Component(FAnime);
