import { DOM } from "../../modules/Element";
import { Component } from "../../modules/ComponentFunc";

const FNav = () => {
  const $wrapper = DOM.create("nav");
  $wrapper.class("add", "navbar-app grid bg-dark text-white"); //añadimos la clase navbar
  // Logo | animes | mangas
  const $logo = DOM.create("img");
  $logo.core.src =
    "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

  const $animes = DOM.link("/mangas");
  $animes.addChilds("manga");

  const $manga = DOM.link("/animes");
  $manga.addChilds("anime");
  const $contact = DOM.link("/contact");
  $contact.addChilds("contact");

  /* 
        add childs for wrapper:
    */
  $wrapper.addChilds([$logo, $animes, $manga, $contact]);

  return $wrapper.core;
};

export default new Component(FNav);
