import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";
import Anime from "../../animeCard/Anime";
import { Arrays } from "../../../modules/ArraysUtils";

import { Title } from "../../../helpers/functions/strings";

const FGroup = ({ title, items, type }) => {
  const $wrapper = DOM.create("ul");
  $wrapper.class("add", "group grid");

  const $Title = DOM.link(`/${title}`);
  $Title.addChilds(Title(`${title}`));
  $Title.class("add", "bg-accent bold ");
  // const $titulo=DOM.create("div")

  const $container = DOM.create("div");
  $container.class("add", "all-items");

  $wrapper.addChilds($Title);
  Array.isArray(items) &&
    items.forEach((item) => {
      // console.log(item);
      // item.title_english ? null : console.log(item);
      const props = Arrays.strainer(item, [
        ["images", "jpg"],
        "genres",
        "title_english",
        "title",
        "mal_id",
      ]);
      // console.log(props);
      let $item = Anime.render($container, {
        img: props.images.jpg.image_url || props.images.jpg.large_image_url,
        genres: props.genres.map((gen) => gen.name),
        name: props.title_english || props.title,
        id: props.mal_id,
        type: type,
      });
      $wrapper.addChilds($item);
    });

  return $wrapper.core;
};

const Group = new Component(FGroup);

export default Group;
