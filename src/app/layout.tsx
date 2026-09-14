import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${portfolioData.profile.name} | AI & Software Engineer`,
  description: portfolioData.profile.summary,
  authors: [{ name: portfolioData.profile.name }],
  openGraph: {
    title: `${portfolioData.profile.name} | Autonomous Architect`,
    description: portfolioData.profile.summary,
    url: portfolioData.profile.github,
    siteName: portfolioData.profile.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f0f0f0] selection:bg-white selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
