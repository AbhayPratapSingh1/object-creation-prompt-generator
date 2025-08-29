import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Obj Creation prompt Gen",
  description: "Generate the prompt for different objects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white`}
      >
        <div className="border-b border-gray-300 z-10 shadow-xl flex  p-0.5 lg:p-2">
          <div className="flex justify-between w-full items-center">

            <div className=" flex justify-center items-center gap-3 mx-4 text-sm font-semibold">
              <Link href={"/"}>
                <div className="">Home</div>
              </Link>
              <Link href={"/about"}>
                <div className="">About</div>
              </Link>
              <Link href={"/help"}>
                <div className="">Help</div>
              </Link>
            </div>
            <Link href={"/"}>
              <div className=" text-2xl border p-2 py-0 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] text-white rounded-md">A.......</div>
            </Link>
          </div>
        </div>
        <div className="flex-grow">
          {children}
        </div>
        <div className=" mt-4 mx-2 text-sm text-gray-800 text-center p-0 border-t border-gray-200">
          No Rights Reserved - 2025 || Practice works by A....
        </div>
      </body>
    </html>
  );
}
