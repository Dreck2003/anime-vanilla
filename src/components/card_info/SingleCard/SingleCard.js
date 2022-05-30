import "./single.css";

import { Component } from "../../../modules/ComponentFunc";
import { DOM } from "../../../modules/Element";
import { SingleState } from "../../../state/animes";

const FSingle = () => {
  const $wrapper = DOM.create("section");
  $wrapper.class("add", "singleCard_app grid");

  $wrapper.addChilds(`
    <a class="single_image" href="${SingleState.state.url}" target="_blank">
      <img src="${SingleState.state.img.slice(
        0,
        SingleState.state.img.length
      )}" alt="Card image"/>
    </a>
   <div class="single_description">
      <a class="single_title fs-500 text-dark bold text-dark" href="${
        SingleState.state.url
      }" target="_blank">
      ${SingleState.state.title}
      </a>
      <span class="single_subtitle text-dark bold">
          Type:
      </span>
      <div>
      ${SingleState.state.type}
      </div>
      <span class="single_subtitle text-dark bold">
          Genre(s):
      </span>
      <div class="single_genres fs-100 bold">
        ${
          SingleState.state.genres.length
            ? SingleState.state.genres
                .map((name) => `<span>${name}</span>`)
                .join(" ")
            : "No information"
        }
      </div>
      <span class="single_subtitle text-dark bold">
          Description:
      </span>
      <p>
        ${
          SingleState.state.synopsis
            ? SingleState.state.synopsis.slice(0, 400)
            : "<i>No information</i>"
        }.
      </p>
      <span class="single_subtitle text-dark bold">
          Published:
      </span>
      <section>
          ${SingleState.state.published}
      </section>
      <span class="single_subtitle text-dark bold">
          Authors:
      </span>
      <div class="single_genres fs-100 bold">
          ${
            SingleState.state.authors.length
              ? SingleState.state.authors
                  .map((name) => `<span>${name}</span>`)
                  .join(" ")
              : "<i>No information</i>"
          }
      </div>      
   </div>
   <article class="single_data flex"> 
      <h3 class="fs-400 bold text-dark">
          More information: 
      </h3>
      <ul>
        <li>
          <b>Popularity: </b>  ${
            SingleState.state.popularity
              ? SingleState.state.popularity
              : "No information"
          }
        </li>
        <li>
          <b>Score: </b> ${
            SingleState.state.score ? SingleState.state.score : "No information"
          }
        </li>
        <li>
          <b>Status: </b> ${
            SingleState.state.status
              ? SingleState.state.status
              : "No information"
          }
        </li>
        <li>
          <b>Chapters: </b> ${
            SingleState.state.chapters
              ? SingleState.state.chapters
              : "No information"
          }
        </li>
        <li>
          <b>Year:   </b> ${
            SingleState.state.year ? SingleState.state.year : "No information"
          }
        </li>
        <li>
          <b>Trailer:  </b> ${
            SingleState.state.trailer && SingleState.state.trailer.url
              ? `
              <a href="${SingleState.state.trailer.url}" target="_blank">
              ${SingleState.state.trailer.url}
              </a>
              `
              : "No information"
          }
        </li>
      </ul>
   </article>
  `);
  // console.log("El state: ", SingleState.state);
  // URL= https://animebee.to/teasing-master-takagi-san-season-3-dub.p32wa

  // URL CARD: http://localhost:3000/card/Spy%20x%20Family/manga
  // https://www.mangaupdates.com/series/akczntm/witch-watchss
  return $wrapper.core;
};

const Single = new Component(FSingle);
SingleState.suscribe(Single);

export default Single;
