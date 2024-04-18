import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShortFilmInfo } from "@/redux/service/omdbApiTypes";
import { Film } from "@/redux/app/slicesStateTypes";
import { useRouter, usePathname } from "next/navigation";

interface MoviesProps {
  data: ShortFilmInfo[] | Film[];
}

export function Movies({ data }: MoviesProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="pl-24 pr-40 flex flex-col">
      <Table>
        <TableCaption>
          {pathname === "/favorites" && "A list of favorite movies"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">Название</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead className="text-right pr-3">Год</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((movie: ShortFilmInfo | Film) => (
            <TableRow
              key={movie.imdbID}
              onClick={() => router.push(`/${movie.imdbID}/film`)}
            >
              <TableCell className="font-medium">{movie.Title}</TableCell>
              <TableCell>{movie.Type}</TableCell>
              <TableCell className="text-right">{movie.Year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
