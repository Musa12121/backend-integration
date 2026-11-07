"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/lib/movies";

const regions = ["US", "AZ", "TR"];

export default function RegionalMovies() {
    const [region, setRegion] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [requestTime, setRequestTime] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        fetch("/api/geo", {
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to detect your region.");
                }

                return response.json();
            })
            .then((data) => {
                if (!controller.signal.aborted) {
                    const detectedRegion = regions.includes(data.region)
                        ? data.region
                        : "AZ";

                    setRegion(detectedRegion);
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    setRegion("AZ");
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (!region) {
            return;
        }
        const controller = new AbortController();
        const startTime = performance.now();

        fetch(`/api/movies?region=${region}`, {
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to load movies.");
                }

                return response.json();
            })
            .then((data) => {
                if (!controller.signal.aborted) {
                    setMovies(data.movies);
                    setRequestTime(performance.now() - startTime);
                }
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Something went wrong."
                    );
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [region]);

    return (
        <section id="movies" className="scroll-mt-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">
                        {region ? `Top picks — ${region}` : "Finding your region..."}
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Explore this region’s movie collection.
                    </p>
                </div>

                <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-white">
                    {regions.map((code) => (
                        <button
                            disabled={!region}
                            key={code}
                            type="button"
                            onClick={() => {
                                if (code === region) {
                                    return;
                                }

                                setLoading(true);
                                setError("");
                                setRegion(code);

                            }}
                            className={`rounded-full px-4 py-2 text-xs font-semibold ${region === code
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {code}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <p role="status" className="text-gray-400">
                    {region ? "Loading movies..." : "Detecting your region..."}
                </p>
            )}

            {!loading && error && (
                <p role="alert" className="text-red-400">
                    {error}
                </p>
            )}

            {!loading && !error && movies.length === 0 && (
                <p className="text-gray-400">
                    No movies are available for this region.
                </p>
            )}

            {!loading && !error && (
                <p className="mb-4 text-xs text-gray-500">
                    Movies loaded in {requestTime.toFixed(1)} ms
                </p>
            )}

            {!loading && !error && movies.length > 0 && (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </section>
    );
}