import type { Metadata } from "next";
import { Noto_Sans_KR, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/i18n/LanguageContext";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Chae Chae — Professional AI Headshot & Photo Studio",
  description:
    "Generate professional resume headshots, passport photos, and creative studio portraits from a single selfie in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${notoSansKr.variable} ${outfit.variable} font-sans antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

