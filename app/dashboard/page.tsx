import { Suspense } from "react";
import MovieSection from "@/components/MovieSection";
import MovieSkeleton from "@/components/Skeleton";
import { movies } from "@/lib/movies";

export default function DashboardPage() {
  const sortedMovies = [...movies].sort(
    (first, second) => second.rating - first.rating
  );

  const highestRatedMovies = sortedMovies.slice(0, 4);
  const moreMovies = sortedMovies.slice(4, 8);

  const regionCount = new Set(
    movies.map((movie) => movie.region)
  ).size;

  const averageRating = (
    movies.reduce((total, movie) => total + movie.rating, 0) /
    movies.length
  ).toFixed(1);

  return (
    <main className="w-full space-y-12 px-6 py-10">
      <header>
        <p className="mb-2 text-sm text-red-500">
          Your space
        </p>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-gray-400">
          Explore your catalog. Each movie section loads independently.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">
            Movies in catalog
          </p>

          <p className="mt-3 text-3xl font-bold">
            {movies.length}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">
            Demo regions
          </p>

          <p className="mt-3 text-3xl font-bold">
            {regionCount}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">
            Average IMDb rating
          </p>

          <p className="mt-3 text-3xl font-bold">
            {averageRating}/10
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          Highest rated
        </h2>

        <Suspense fallback={<MovieSkeleton />}>
          <MovieSection
            movies={highestRatedMovies}
            delay={1000}
          />
        </Suspense>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          More to explore
        </h2>

        <Suspense fallback={<MovieSkeleton />}>
          <MovieSection
            movies={moreMovies}
            delay={2500}
          />
        </Suspense>
      </section>
    </main>
  );
}