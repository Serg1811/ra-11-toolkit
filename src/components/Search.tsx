"use client";

import { useDispatch } from "react-redux";
import { setName } from "@/redux/app/slices";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Search() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const searchHandler = useDebouncedCallback((name: string) => {
    if (pathname !== "/") router.push("/");

    dispatch(setName(name));
  }, 400);

  return (
    <div className="flex gap-3 p-2.5">
      <label
        htmlFor="search"
        className="self-center text-lg font-bold text-blue-500"
      >
        Поиск
      </label>
      <input
        id="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => searchHandler(e.target.value)}
      />
      <Link
        href={pathname === "/favorites" ? "/" : "/favorites"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Избранное
      </Link>
    </div>
  );
}
