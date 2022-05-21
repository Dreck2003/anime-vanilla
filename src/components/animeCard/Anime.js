import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";

const FAnime = () => {
  const $wrapper = DOM.create("section");
  $wrapper.text(false, "WAJAJAJAJA");

  return $wrapper.core;
};

export default new Component(FAnime);
