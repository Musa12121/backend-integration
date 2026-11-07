import Image from "next/image";
import type { Movie } from "@/lib/movies.ts";
import MovieDetailsButton from "./MovieDetailsButton";

type MovieCardProps = {
    movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="cursor-pointer hover:scale-105 transition-transform">
            <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-white/10 bg-gray-900">
                <Image
                    src={movie.image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 17vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                <div className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs font-semibold">
                    <span className="text-yellow-400">★</span>{" "}
                    IMDb {movie.rating.toFixed(1)}/10
                </div>

                <div className="absolute bottom-0 left-0 w-full p-3">
                    <h3 className="text-base font-bold">
                        {movie.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-300">
                        {movie.year} · {movie.duration}
                    </p>
                </div>
            </div>

            <p className="mt-3 text-sm text-gray-400">
                {movie.genre}
            </p>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-300">
                {movie.description}
            </p>
            <MovieDetailsButton movie={movie} />
        </div>
    );
}