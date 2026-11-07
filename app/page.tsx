import { Movie } from "@/lib/movies";
import { movies } from "@/lib/movies";
import BigMoviePoster from "@/components/BigMoviePoster";
import RegionalMovies from "@/components/RegionalMovies";

export default function HomePage() {
  const targetRating = Math.max(...movies.map((movie: Movie) => movie.rating));
  const targetMovie = movies.find((movie: Movie) => movie.rating === targetRating);
  return (
    <main className="w-full px-6 py-10 flex flex-col gap-10">

      {targetMovie && <BigMoviePoster movie={targetMovie} />}

      <RegionalMovies />
    </main>
  );
}