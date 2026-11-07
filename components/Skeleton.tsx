export default function MovieSkeleton() {
    return (
        <div>
            <span className="sr-only">Loading movies...</span>

            <div
                className="grid grid-cols-2 gap-5 lg:grid-cols-4"
            >
                {[1, 2, 3, 4].map((number) => (
                    <div key={number}>
                        <div className="aspect-2/3 rounded-xl bg-white/10" />

                        <div className="mt-3 h-4 w-20 rounded bg-white/10" />

                        <div className="mt-3 h-4 w-full rounded bg-white/10" />

                        <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />
                    </div>
                ))}
            </div>
        </div>
    );
}