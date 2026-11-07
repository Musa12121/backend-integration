import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "EDGEFLIX",
  description: "A movie dashboard demonstrating edge computing and streaming.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#080808] text-white antialiased">
        <Navbar />

        <div className="flex-1">
          {children}
        </div>

        <footer className="border-t border-white/10">
          <div className="mx-auto w-full px-6 py-6 text-sm text-gray-500 flex items-center">
            <Image
              src="/edgeflix-logo.svg"
              alt=""
              width={32}
              height={32}
            />EDGEFLIX · Edge computing demo
          </div>
        </footer>
      </body>
    </html>
  );
}
