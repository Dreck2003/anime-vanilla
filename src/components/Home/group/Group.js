import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";
import Anime from "../../animeCard/Anime";

const FGroup = ({ title, items }) => {
  const $wrapper = DOM.create("section");
  $wrapper.class("group");

  const $Title = DOM.create("span");
  $Title.text(false, `${title}`);

  const $container = DOM.create("div");
  $container.class("all-items");

  Array.isArray(items) &&
    items.forEach((item) => {
      let $item = Anime.render($container);
      console.log(item);
      $wrapper.addChilds($item);
    });

  $wrapper.addChilds($Title);
  return $wrapper.core;
};

export default new Component(FGroup);
