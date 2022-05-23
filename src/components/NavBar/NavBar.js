import "./nav.components.css";
import { DOM } from "../../modules/Element";
import { Component } from "../../modules/ComponentFunc";

const FNav = () => {
  const $wrapper = DOM.create("nav");
  $wrapper.class("add", "navbar-app grid text-dark bold fs-400 uppercase"); //añadimos la clase navbar
  // Logo | animes | mangas
  // const $logo = DOM.create("img");
  // // $logo
  // $logo.core.src =
  //   "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

  /*funcitons */

  (() => {
    console.log($wrapper.core.style.height);
    console.log("Se hizo el iife");
  })();

  /*funcitons */

  const path = window.location.pathname;
  const props = {
    init: "",
    mangas: "",
    animes: "",
    about: "",
  };
  if (path == "/") props.init = "navigation";
  if (path == "/mangas") props.mangas = "navigation";
  if (path == "/anime") props.animes = "navigation";
  if (path == "/about") props.about = "navigation";
  console.log(props);

  const $logo = DOM.link("/");
  $logo.addChilds("inicio");
  $logo.class("add", `${props.init}`);

  const $animes = DOM.link("/mangas");
  $animes.addChilds("manga");
  $logo.class("add", `${props.animes}`);

  const $manga = DOM.link("/animes");
  $manga.addChilds("anime");
  $manga.class("add", `${props.mangas}`);

  const $contact = DOM.link("/about");
  $contact.addChilds("about");
  $contact.class("add", `${props.about}`);

  /* 
        add childs for wrapper:
    */
  $wrapper.addChilds([$logo, $animes, $manga, $contact]);

  return $wrapper.core;
};

export default new Component(FNav);
