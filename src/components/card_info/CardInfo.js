import "./InfoCard.css";
import { DOM } from "../../modules/Element";
import { Component } from "../../modules/ComponentFunc";
import Single from "./SingleCard/SingleCard";
import { MoreCards } from "../../state/animes";
import { appendCard } from "../../helpers/ajax/TopAnime";

const FCardInfo = () => {
  const $wrapper = DOM.create("main");
  $wrapper.class("add", "info_card");
  $wrapper.addChilds(Single.render($wrapper));

  const $more = DOM.create("article");
  $more.class("add", "info_more");
  $more.addChilds(`<hr><h3 class="${"text-dark"}">Relationates themes: </h3>`);
  const $relleno = DOM.create("div");
  $relleno.class("add", "info_cards grid");
  appendCard($relleno.core, MoreCards.state);
  $more.addChilds($relleno);

  $wrapper.addChilds($more);

  return $wrapper.core;
};

const CardInfo = new Component(FCardInfo);
MoreCards.suscribe(CardInfo);

export default CardInfo;
