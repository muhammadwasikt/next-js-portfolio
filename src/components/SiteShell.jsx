"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
export default function SiteShell({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return children;
  return <LoadingScreen><Navbar />{children}<Footer /></LoadingScreen>;
}
