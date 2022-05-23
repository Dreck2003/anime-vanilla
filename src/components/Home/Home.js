import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";
// import { Arrays } from "../../modules/ArraysUtils";
import Group from "./group/Group";
import { AnimeState } from "../../state/animes";

const FHome = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "home_app");

  $wrapper.addChilds(
    Group.render($wrapper, {
      title: "animes",
      items: AnimeState.state.topAnimes,
    })
  );

  $wrapper.addChilds(
    Group.render($wrapper, {
      title: "mangas",
      items: AnimeState.state.topMangas,
    })
  );

  return $wrapper.core;
};

const Home = new Component(FHome);

AnimeState.suscribe(Home);
export default Home;
