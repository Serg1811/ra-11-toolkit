import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieCard, Response } from "@/redux/service/omdbApiTypes";

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.omdbapi.com/`,
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<Response, { title: string; page: number }>({
      query: ({ title, page }) =>
        `?s=${title}&page=${page}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
    }),
    getMovie: builder.query<MovieCard, { imdbID: string }>({
      query: ({ imdbID }) =>
        `?i=${imdbID}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieQuery } = omdbApi;
