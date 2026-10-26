import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb" });

export const metadata: Metadata = {
  title: `${profile.name} — Full-Stack Developer`,
  description: `Portfolio of ${profile.name}, a full-stack developer and Computer Science student specializing in Software Engineering.`,
  openGraph: {
    title: `${profile.name} — Full-Stack Developer`,
    description:
      "Full-stack developer and Computer Science student specializing in Software Engineering.",
    type: "website",
  },
};

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${jb.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("lenj-portfolio-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-electric focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
