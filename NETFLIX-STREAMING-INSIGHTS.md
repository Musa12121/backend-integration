# Netflix Streaming Insights

Building EDGEFLIX helped me understand how a page can show content gradually and receive live updates. Before this project, I mostly worked with components that loaded their data all at once.

I learned that an edge runtime can run server code closer to users when the hosting platform supports it. My API routes use standard web APIs such as Request, Response, and ReadableStream. For regional content, I read a country header and use AZ as a fallback. The movie regions are demo groups, not real streaming availability.

React Suspense lets the dashboard show skeletons while separate movie sections are loading. I added delays to make this behavior easy to see. Dynamic imports serve a different purpose: they let the movie details code load when it is needed.

SSE lets the server push messages through one connection.

Caching was another useful lesson. Movie responses can be reused by a shared cache, while location responses and live events should stay fresh.