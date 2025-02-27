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
  title: "Muhammad wasi",
  description: "A highly optimized and SEO-friendly portfolio built with Next.js 15.",
  url: "https://your-portfolio.com",
  siteName: "Muhammad Wasi Portfolio",
  images: [
    {
      url: "/favicon.png",
      width: 1200,
      height: 630,
    },
  ],
  type: "website",
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
