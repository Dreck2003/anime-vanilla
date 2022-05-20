import { DOM } from "../../modules/Element";
import { Component } from "../../modules/ComponentFunc";

const FNav = () => {
  const $wrapper = DOM.create("nav");
  $wrapper.class("add", ["navbar-app"]); //añadimos la clase navbar

  // Logo | animes | mangas
  const $logo = DOM.create("img");
  $logo.core.src = "#";

  const $animes = DOM.link("/mangas");
  $animes.addChilds("Ir a mangas");

  const $manga = DOM.link("/animes");
  $manga.addChilds("Ir a animes");

  /* 
        add childs for wrapper:
    */

  $wrapper.addChilds([$logo, $animes, $manga]);

  return $wrapper.core;
};

export default new Component(FNav);
