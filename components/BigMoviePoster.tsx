import Image from "next/image";
import type { Movie } from "@/lib/movies";

  type BigMoviePosterProps = {
    movie: Movie;
  };

export default function BigMoviePoster({ movie }: BigMoviePosterProps) {
  return (
    <section
      className="relative flex min-h-100 items-center overflow-hidden rounded-2xl border border-white/10 bg-gray-900"
    >
      <Image
        src={movie.image}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/10" />

      <div className="relative z-10 w-full px-6 py-12 md:px-12">
        <p className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          Featured movie
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          {movie.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
          <span className="font-semibold text-yellow-400">
            ★ {movie.rating}
          </span>

          <span>{movie.year}</span>

          <span>{movie.duration}</span>

          <span className="rounded border border-white/30 px-2 py-0.5">
            {movie.genre}
          </span>
        </div>

        <p className="mt-5 text-base leading-7 text-gray-200">
          {movie.description}
        </p>

        <a
          href="#movies"
          className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-gray-200"
        >
          Browse movies
        </a>
      </div>
    </section>
  );
}