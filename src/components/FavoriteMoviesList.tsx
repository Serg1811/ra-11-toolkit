"use client";

import { useSelector } from "react-redux";
import { selectFavorites } from "@/redux/app/selector";
import { Movies } from "@/components/Movies";

export function FavoriteMoviesList() {
  const favFilms = useSelector((state) => selectFavorites(state));

  if (favFilms.length > 0) {
    return <Movies data={favFilms} />;
  }
}
