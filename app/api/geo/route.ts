export const runtime = "edge";

const supportedRegions = ["US", "AZ", "TR"];

export function GET(request: Request) {
  const detectedCountry = request.headers
    .get("x-vercel-ip-country")
    ?.trim()
    .toUpperCase();

  const isSupported =
    detectedCountry !== undefined &&
    supportedRegions.includes(detectedCountry);

  const region = isSupported ? detectedCountry : "AZ";

  return Response.json(
    {
      region,
      source: isSupported ? "location" : "fallback",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}