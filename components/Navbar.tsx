import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="border-b border-white/10">
            <nav
                className="mx-auto grid grid-cols-[20fr_80fr] md:grid-cols-2 w-full flex-wrap items-center justify-between gap-8 px-5 md:px-16 py-5"
            >
                <Link href="/"><Image
                    src="/edgeflix-logo.svg"
                    alt=""
                    width={40}
                    height={40}
                /></Link>


                <div className="flex items-center gap-6 text-md justify-around">
                    <Link href="/" className="text-gray-400 hover:text-white">
                        Home
                    </Link>

                    <Link
                        href="/dashboard"
                        className="text-gray-400 hover:text-white"
                    >
                        Dashboard
                    </Link>

                    <Link href="/live" className="text-gray-400 hover:text-white">
                        <span
                            className="mr-2 h-2 w-2 rounded-full bg-red-600 hidden md:inline-block"
                        />
                        Live
                    </Link>
                </div>
            </nav>
        </header>
    );
}