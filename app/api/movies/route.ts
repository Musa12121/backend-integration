import { movies } from "@/lib/movies";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const supportedRegions = ["US", "AZ", "TR"];

export async function GET(request: NextRequest) {
  try {
    const region = (
      request.nextUrl.searchParams.get("region") ?? "AZ"
    ).trim().toUpperCase();

    if (!supportedRegions.includes(region)) {
      return Response.json(
        {
          error: "Unsupported region. Choose US, AZ, or TR.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const regionalMovies = movies.filter(
      (movie) => movie.region === region
    );

    return Response.json(
      {
        region,
        movies: regionalMovies,
      },
      {
        headers: {
          "Cache-Control":
            "public,s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Something went wrong", error);

    return Response.json(
      {
        error: "Unable to load movies. Please try again.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}