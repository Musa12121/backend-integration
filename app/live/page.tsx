import LiveActivity from "@/components/LiveActivity";

export default function LivePage() {
  return (
    <main className="w-full px-6 py-10">
      <p className="mb-2 text-sm font-bold text-red-500">
        Real-time
      </p>

      <h1 className="text-3xl font-bold">
        Live activity
      </h1>

      <p className="mt-3 text-gray-400">
        Simulated viewer updates and activity delivered through SSE.
      </p>

      <LiveActivity />
    </main>
  );
}