import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muhammad Wasi | MERN Stack Developer",
  description:
    "Experienced MERN Stack Developer building high-performance, scalable web applications. Explore my SEO-optimized portfolio built with Next.js 15.",
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  url: "https://muhammadwasiportfolio.vercel.app",
  siteName: "Muhammad Wasi Portfolio",
  images: [
    {
      url: "/favicon.ico",
      width: 1200,
      height: 630,
      alt: "Muhammad Wasi Portfolio Thumbnail",
    },
  ],
  type: "website",
  keywords: [
    "Muhammad Wasi",
    "MERN Stack Developer",
    "Next.js 15 Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Web Development",
    "SEO Optimized Portfolio",
  ],
  authors: [{ name: "Muhammad Wasi", url: "https://muhammadwasiportfolio.vercel.app" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadwasiportfolio.vercel.app",
    title: "Muhammad Wasi | MERN Stack Developer",
    description:
      "An SEO-friendly portfolio showcasing MERN stack projects built with Next.js 15.",
    siteName: "Muhammad Wasi Portfolio",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Muhammad Wasi Portfolio Thumbnail",
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen>
            <Navbar />
            {children}
            <Footer />
          </LoadingScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
