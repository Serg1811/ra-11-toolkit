"use client";

import { useGetMoviesQuery } from "@/redux/service/omdbApi";
import { useSelector } from "react-redux";
import { selectAppModule } from "@/redux/app/selector";
import { Movies } from "@/components/Movies";
import { useEffect, useRef, useState } from "react";
import { ShortFilmInfo } from "@/redux/service/omdbApiTypes";

export function FetchingMoviesList() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<ShortFilmInfo>>([]);
  const state = useSelector((state) => selectAppModule(state).name);
  const { data, isFetching, isLoading, error, isSuccess } = useGetMoviesQuery({
    title: state,
    page,
  });
  const endOfResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [state]);

  useEffect(() => {
    endOfResultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [movies.length]);

  useEffect(() => {
    if (data?.Search) {
      setMovies((movies) => {
        let curMovies: ShortFilmInfo[] = [...movies, ...data.Search];
        let uniqueMovies = Array.from(new Set(curMovies.map((m) => m.imdbID)))
          .map((imdbID) => curMovies.find((m) => m.imdbID === imdbID))
          .filter(Boolean);
        return uniqueMovies as ShortFilmInfo[];
      });
    }
  }, [data?.Search]);

  if (isLoading) {
    return <div className="pl-24 pr-40 flex flex-col">Loading...</div>;
  }
  if (!isSuccess && !data) {
    return null;
  }

  if (state === "") {
    return null;
  }

  const onLoadMore = () => {
    if (data?.totalResults && Number(data?.totalResults) > movies.length) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.Response === "False" || error) {
    return null;
  }

  if (!isSuccess && !data) {
    return <div className="pl-24 pr-40 flex flex-col">{data["Error"]}</div>;
  }

  if (data["Response"] === "True" && data.Search && movies.length > 0) {
    return (
      <div className="flex flex-col pb-5">
        <Movies data={movies} />
        {Number(data?.totalResults) <= movies.length || (
          <button
            onClick={onLoadMore}
            disabled={isFetching}
            className="text-sm pl-24 pr-40 "
          >
            Загрузить еще...
          </button>
        )}
        <div ref={endOfResultRef}></div>
      </div>
    );
  } else {
    return null;
  }
}
