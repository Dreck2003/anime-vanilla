import "./InfoCard.css";
import { DOM } from "../../modules/Element";
import { Component } from "../../modules/ComponentFunc";
import Single from "../SingleCard/SingleCard";

const FCardInfo = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "info_card");
  $wrapper.addChilds(Single.render($wrapper));

  return $wrapper.core;
};

const CardInfo = new Component(FCardInfo);

export default CardInfo;
