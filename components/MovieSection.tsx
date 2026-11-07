import { connection } from "next/server";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/lib/movies";

type MovieSectionProps = {
  movies: Movie[];
  delay: number;
};

export default function MovieSection({
  movies,
  delay,
}: MovieSectionProps) {
  return connection()
    .then(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    })
    .then(() => {
      return (
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      );
    });
}