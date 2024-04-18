import { StoreProvider } from "@/redux/StoreProvider";
import { FavoriteMoviesList } from "@/components/FavoriteMoviesList";

export default function Favorites() {
  return (
    <StoreProvider>
      <FavoriteMoviesList />
    </StoreProvider>
  );
}
