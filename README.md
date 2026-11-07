# Welcome to 04 Edge Computing Streaming

---

## Task

The task was to build a Netflix-inspired website that uses edge functions, progressive page loading, and live updates. I called my project **EDGEFLIX**.

The main challenge was understanding three different things: returning movie data for a selected region, showing parts of a page before everything is ready, and receiving updates without refreshing the page.

## Description

I built the project with **Next.js 16.2, React, TypeScript, and Tailwind CSS**. I also used NumberFlow to animate the live viewer count.

The website has three pages:

- **Home:** a featured movie and a regional movie catalog. Users can switch between the United States (US), Azerbaijan (AZ), and Turkey (TR), and open movie details.
- **Dashboard:** catalog statistics and two movie sections that load independently. React Suspense shows skeleton cards while each section is loading.
- **Live:** a simulated viewer count, the highest count seen during the current page visit, an event counter, and the six latest activity messages.

The catalog contains 50 movies stored in `lib/movies.ts`. Posters are stored in `public/images`. Movie years, durations, and IMDb ratings are saved locally, so they do not update automatically. The region assignments are for this demo and do not represent real Netflix availability.

The app uses these API routes:

| Route                   | What it does                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `/api/geo`              | Reads the `x-vercel-ip-country` request header. It falls back to AZ when the country is missing or unsupported.  |
| `/api/movies?region=US` | Returns movies for the selected region. US, AZ, and TR are supported. An unsupported region returns a 400 error. |
| `/api/events`           | Sends `viewers` and `activity` events through Server-Sent Events (SSE).                                          |

All three API routes declare the edge runtime. The browser fetches regional movies from the API, but the API reads the local catalog rather than an external movie service. Loading and error messages help users understand what is happening. AbortController cancels requests when they are no longer needed.

On the dashboard, the movie sections have intentional delays of 1 second and 2.5 seconds to demonstrate progressive loading. The movie details component uses a dynamic import so its code can load when needed.

The live endpoint sends an update immediately and then every 3 seconds. It randomly generates viewer counts and chooses from 20 activity messages. These are demonstration events, not actual user activity. EventSource handles reconnection after recoverable connection failures, and the connection is closed when the component unmounts.

The movie API uses `public, s-maxage=60, stale-while-revalidate=300`. This lets a shared cache keep a response fresh for 60 seconds and serve it stale for up to another 300 seconds while refreshing it. Regional requests have different query URLs. Location responses, live events, and API errors use `no-store`.

The home page also displays the latest movie request time in milliseconds. This includes browser and network time; it is not a measurement of server execution alone.

## Installation

Clone/install the repo, then:

Open a terminal and install the dependencies:

```bash
cd netflix-streaming-project
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Use the navigation links to visit Home, Dashboard, and Live.

To check the code and create a production build, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

After the build finishes, start the production server:

```bash
npm run start
```

Stop the development server before starting the production server on the same port. If PowerShell blocks `npm.ps1`, use `npm.cmd` and `npx.cmd` instead of `npm` and `npx`.

For a manual check:

1. Switch between US, AZ, and TR on Home and check that the movie list changes.
2. Open and close a movie's details.
3. Open Dashboard directly or refresh it to see the skeletons and separate movie sections appear.
4. Open Live and check that the count and activity list update without refreshing.
5. Open `/api/movies?region=XX` and check that it returns an unsupported-region error.

Locally, automatic location detection normally falls back to AZ because the Vercel country header is missing. Deployment is intended for Vercel; hosted geolocation, CDN caching, and edge execution still need to be checked after deployment.

My short notes about what I learned are in [NETFLIX-STREAMING-INSIGHTS.md]

### The Core Team


<img alt="Qwasar SV -- Software Engineering School's Logo" src="https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png" width="20" />
