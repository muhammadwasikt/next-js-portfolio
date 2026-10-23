import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteShell from "@/components/SiteShell";
import Script from "next/script";
import { Geist } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://muhammadwasiportfolio.vercel.app"),
  title: { default: "Portfolio", template: "%s | Portfolio" },
  description: ""
};

export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><body className={geistSans.variable + " antialiased"}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SiteShell>{children}</SiteShell>
    </ThemeProvider>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-49JXYHF3YK" strategy="lazyOnload" />
    <Script id="google-analytics" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-49JXYHF3YK');" }} />
  </body></html>;
}
