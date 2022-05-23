import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";
import Anime from "../../animeCard/Anime";
import { Arrays } from "../../../modules/ArraysUtils";

import { Title } from "../../../helpers/functions/strings";

const FGroup = ({ title, items }) => {
  const $wrapper = DOM.create("ul");
  $wrapper.class("add", "group grid");

  // console.log({ title, items });

  const $Title = DOM.link(`/${title}`);
  $Title.addChilds(Title(`${title}`));
  $Title.class("add", "bg-light bold");

  const $container = DOM.create("div");
  $container.class("add", "all-items");

  Array.isArray(items) &&
    items.forEach((item) => {
      // console.log(item);
      // item.title_english ? null : console.log(item);
      const props = Arrays.strainer(item, [
        ["images", "jpg"],
        "genres",
        "title_english",
        "title",
      ]);
      // console.log(props);
      let $item = Anime.render($container, {
        img: props.images.jpg.image_url || props.images.jpg.large_image_url,
        genres: props.genres.map((gen) => gen.name),
        name: props.title_english || props.title,
      });
      $wrapper.addChilds($item);
    });

  $wrapper.addChilds($Title);
  return $wrapper.core;
};

const Group = new Component(FGroup);

export default Group;
