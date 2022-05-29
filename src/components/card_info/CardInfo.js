import { DOM } from "../../modules/Element";
import { Component } from "../../modules/ComponentFunc";

const FCardInfo = () => {
  const $wrapper = DOM.create("main");

  return $wrapper.core;
};

const CardInfo = new Component(FCardInfo);

export default CardInfo;
