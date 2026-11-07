import type { Movie } from "@/lib/movies";

type MovieDetailsProps = {
  movie: Movie;
};

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="my-4 rounded-lg border border-white/10 bg-white/5 p-4">
      <h4 className="font-semibold">
        {movie.title}
      </h4>

      <p className="mt-2 text-sm text-gray-400">
        {movie.year} · {movie.duration} · {movie.genre}
      </p>

      <p className="mt-3 text-sm leading-6 text-gray-300">
        {movie.description}
      </p>

      <p className="mt-3 text-sm text-yellow-400">
        ★ IMDb {movie.rating.toFixed(1)}/10
      </p>
    </div>
  );
}