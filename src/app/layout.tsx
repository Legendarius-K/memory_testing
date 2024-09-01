import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Memorista",
    description: "The ultimate mfkin memory game",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`m-0 bg-slate-800 ${inter.className}`}>
                <Header />
                <section className="flex flex-col items-center">
                    {children}
                </section>
            </body>
        </html>
    );
}
