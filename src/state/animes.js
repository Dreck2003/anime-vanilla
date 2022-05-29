import { Context } from "../modules/Context";

export const AnimeState = new Context({
  topAnimes: [],
  topMangas: [],
});

export const SingleState = new Context({
  img: "",
  title: "",
  synopsis: "",
  genres: [],
  score: "",
  status: "",
  popularity: "",
  trailer: "",
  type: "",
  url: "",
  year: "",
  authors: [],
  chapters: 0,
  published: "",
});
