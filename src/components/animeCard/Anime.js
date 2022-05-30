import "./anime.css";

import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";
import { Router } from "../../modules/Router";
import { getSingleCard } from "../../helpers/ajax/TopAnime";

const FAnime = ({ img, genres, name, id, type }) => {
  const $wrapper = DOM.create("li");
  $wrapper.class("add", "card_container");
  const $div = DOM.create("div");
  $div.addChilds(`
    <img src="${img}" alt="${name}"/>
    <div class="card_play hidden">
      <img src="../../../public/images/bx-play-circle.svg"/>
    </div>
    `);
  $div.class("add", "card_img");
  $div.addClick((event) => {
    event.preventDefault();
    console.log("El id del card es: ", { id, name, type });
    getSingleCard(type, name);
    Router.navigate(`/card/${name}/${type}`);
  });

  let text = "";
  genres = genres.slice(0, 2);
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
    console.log("El id del card es: ", { id, name, type });
    getSingleCard(type, name);
    Router.navigate(`/card/${name}/${type}`);
  });
  $link.text(true, `${name}`);
  $link.class("add", "anime_link ellipsis bold text-dark fs-300");
  $wrapper.addChilds($link);

  return $wrapper.core;
};

export default new Component(FAnime);
