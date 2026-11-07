"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Movie } from "@/lib/movies";

const MovieDetails = dynamic(() => import("./MovieDetails"));

type MovieDetailsButtonProps = {
    movie: Movie;
};

export default function MovieDetailsButton({
    movie,
}: MovieDetailsButtonProps) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setShowDetails((previous) => !previous)}
                className="mt-4 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
                {showDetails ? "Hide details" : "Show details"}
            </button>

            {showDetails && <MovieDetails movie={movie} />}
        </>
    );
}