import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";
import { Arrays } from "../../modules/ArraysUtils";
import Group from "./group/Group";

const FHome = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "home_app");
  $wrapper.addChilds("HOLA MUNDILLO TOXICO");

  Arrays.loop(5, (index) => {
    console.log("Se hizo el loop: ", index);
    const $item = Group.render($wrapper, { title: index });
    console.log($item);
    $wrapper.addChilds($item);
  });

  console.log($wrapper.core.children);
  return $wrapper.core;
};

export default new Component(FHome);
