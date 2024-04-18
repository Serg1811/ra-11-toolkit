import { FetchingMoviesList } from "@/components/FetchingMoviesList";
import { StoreProvider } from "@/redux/StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <FetchingMoviesList />
    </StoreProvider>
  );
}
