import { Film } from "@/redux/app/slicesStateTypes";

export const selectAppModule = (state: any) => state.app;

export const selectFavorite = (state: any, filmId: string) => {
  return state.app.films.some((film: Film) => film.imdbID === filmId);
};

export const selectFavorites = (state: any) => state.app.films;
