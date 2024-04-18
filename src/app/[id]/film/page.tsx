/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useGetMovieQuery } from "@/redux/service/omdbApi";
import Image from "next/image";
import { selectFavorite } from "@/redux/app/selector";
import { useDispatch, useSelector } from "react-redux";
import { addFilm, removeFilm } from "@/redux/app/slices";
import { useRouter } from "next/navigation";

export default function MoviePage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMovieQuery({ imdbID: params.id });
  const favorite = useSelector((state) => selectFavorite(state, params.id));

  const router = useRouter();

  if (isLoading) {
    return <div className="pl-24 pr-40 flex flex-col">Loading...</div>;
  }

  if (data === null) {
    return <div className="pl-24 pr-40 flex flex-col">Movie not found</div>;
  }

  return (
    <div className="flex flex-col">
      <Image
        className="self-end mr-80 pt-16 cursor-pointer"
        src={
          favorite
            ? "/star_FILL1_wght100_GRAD0_opsz24.svg"
            : "/star_FILL0_wght100_GRAD0_opsz24.svg"
        }
        width={35}
        height={35}
        alt="Favorite"
        onClick={() => {
          favorite
            ? dispatch(removeFilm(params.id))
            : dispatch(
                addFilm({
                  imdbID: params.id,
                  Title: data?.Title,
                  Type: data?.Type,
                  Year: data?.Year,
                }),
              );
        }}
      />
      <Link
        href="#"
        onClick={() => router.back()}
        className="pl-24 pr-40 block"
      >
        <div className="flex justify-center">
          <img
            className="rounded-lg"
            src={data!.Poster}
            width={300}
            height={446}
            alt={`Постер ${data?.Title}`}
          />
          <div className="pl-4 divide-solid divide-y flex flex-col justify-center ">
            <p className="font-bold text-">{data?.Title}</p>
            <p className="pt-3">{data?.Year}</p>
            <p className="pt-3">{data?.Genre}</p>
            <p className="pt-3">{data?.Runtime}</p>
            <p className="pt-3">{data?.Director}</p>
            <p className="pt-3">{data?.Actors}</p>
            <p className="pt-3">
              Rating IMDb: <span className="font-bold">{data?.imdbRating}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
