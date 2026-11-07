"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

type ViewerUpdate = {
    count: number;
};

type Activity = {
    message: string;
    time: string;
};

const numberTiming = {
    duration: 200,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
};

export default function LiveActivity() {
    const [status, setStatus] = useState("Connecting");
    const [viewers, setViewers] = useState(0);
    const [peak, setPeak] = useState(0);
    const [eventsReceived, setEventsReceived] = useState(0);
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const source = new EventSource("/api/events");

        source.onopen = () => {
            setStatus("Connected");
        };

        source.addEventListener("viewers", (event) => {
            const data: ViewerUpdate = JSON.parse(event.data);

            setViewers(data.count);
            setPeak((previous) => Math.max(previous, data.count));
            setEventsReceived((previous) => previous + 1);
        });

        source.addEventListener("activity", (event) => {
            const data: Activity = JSON.parse(event.data);

            setActivities((previous) => [data, ...previous].slice(0, 6));
            setEventsReceived((previous) => previous + 1);
        });

        source.onerror = () => {
            setStatus(
                source.readyState === EventSource.CLOSED
                    ? "Disconnected"
                    : "Reconnecting"
            );
        };

        return () => {
            source.close();
        };
    }, []);

    return (
        <div className="mt-8 space-y-6">
            <p
                className={
                    status === "Connected"
                        ? "text-sm text-green-400"
                        : "text-sm text-gray-400"
                }
            >
                ● {status}
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-gray-400">
                        Watching now · simulated
                    </p>

                    <p className="mt-3 text-4xl font-bold tabular-nums">
                        <NumberFlow
                            value={viewers}
                            locales="en-US"
                            transformTiming={numberTiming}
                            spinTiming={numberTiming}
                            opacityTiming={numberTiming}
                        />
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-gray-400">
                        Peak watcher amount
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                        {peak.toLocaleString()}
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-gray-400">
                        Events received
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                        {eventsReceived}
                    </p>
                </div>
            </div>

            <section className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <h2 className="border-b border-white/10 px-6 py-4 font-semibold">
                    Recent activity
                </h2>

                {activities.length === 0 && (
                    <p className="px-6 py-4 text-sm text-gray-400">
                        Waiting for activity...
                    </p>
                )}

                <ul className="divide-y divide-white/10">
                    {activities.map((activity) => (
                        <li
                            key={activity.time}
                            className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                        >
                            <p className="text-sm">
                                {activity.message}
                            </p>

                            <p className="text-xs text-gray-500">
                                {new Date(activity.time).toLocaleTimeString()}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}