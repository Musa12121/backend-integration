export const runtime = "edge";

const messages = [
  "A viewer started watching Inception.",
  "A viewer finished Interstellar.",
  "A viewer added The Green Mile to their list.",
  "A viewer started watching The Matrix.",
  "A viewer added The Dark Knight to their list.",
  "A viewer finished The Shawshank Redemption.",
  "A viewer started watching Fight Club.",
  "A viewer resumed Forrest Gump.",
  "A viewer added Pulp Fiction to their list.",
  "A viewer started watching Gladiator.",
  "A viewer finished The Prestige.",
  "A viewer resumed Whiplash.",
  "A viewer added Spirited Away to their list.",
  "A viewer started watching Parasite.",
  "A viewer finished The Truman Show.",
  "A viewer added Dune: Part Two to their list.",
  "A viewer resumed Oppenheimer.",
  "A viewer started watching Coco.",
  "A viewer finished Spider-Man: Into the Spider-Verse.",
  "A viewer added The Intouchables to their list.",
];

export function GET(request: Request) {
  const encoder = new TextEncoder();

  let cleanup: (() => void) | undefined;

  const stream = new ReadableStream({
    start(controller) {
      function sendEvent(name: string, data: object) {
        const message =
          `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`;

        controller.enqueue(encoder.encode(message));
      }

      function sendUpdates() {
        const count = 10000 + Math.floor(Math.random() * 500);

        const message =
          messages[Math.floor(Math.random() * messages.length)];

        sendEvent("viewers", { count });

        sendEvent("activity", {
          message,
          time: new Date().toISOString(),
        });
      }

      const timer = setInterval(sendUpdates, 3000);

      function closeStream() {
        cleanup?.();
        controller.close();
      }

      cleanup = () => {
        clearInterval(timer);
        request.signal.removeEventListener("abort", closeStream);
      };

      request.signal.addEventListener("abort", closeStream);

      if (request.signal.aborted) {
        closeStream();
        return;
      }

      controller.enqueue(encoder.encode("retry: 3000\n\n"));

      sendUpdates();
    },

    cancel() {
      cleanup?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
