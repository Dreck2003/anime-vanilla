import { Component } from "../../modules/ComponentFunc";
import { DOM } from "../../modules/Element";

const FSingle = () => {
  const $wrapper = DOM.create("section");
  $wrapper.text(false, "ESTO ES TEXTO");

  return $wrapper.core;
};

const Single = new Component(FSingle);

export default Single;
