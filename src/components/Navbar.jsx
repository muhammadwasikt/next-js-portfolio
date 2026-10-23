"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { ThemeController } from "./theme-controller";
import useSiteContent from "./useSiteContent";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const site = useSiteContent();
  const settings = site.site_settings || {};
  const items = Array.isArray(site.navigation?.items) ? site.navigation.items : [];
  return <header className="portfolio-site-nav">
    <Link href="/" className="portfolio-site-brand">{settings.brand_name || ""}<span>↗</span></Link>
    <nav className="portfolio-site-nav-links">{items.map((item,index)=><Link key={item.href || index} href={item.href || "/"}>{item.label || ""}</Link>)}</nav>
    <div className="portfolio-site-nav-actions"><ThemeController /><Sheet open={isOpen} onOpenChange={setIsOpen}><SheetTrigger asChild><Button variant="outline" size="icon" className="portfolio-mobile-menu" aria-label="Open navigation"><Menu size={19}/></Button></SheetTrigger><SheetContent side="right"><nav className="grid gap-3 py-8">{items.map((item,index)=><Link key={item.href || index} href={item.href || "/"} onClick={()=>setIsOpen(false)} className="flex items-center justify-between py-2 text-lg font-semibold">{item.label || ""}<ArrowUpRight size={16}/></Link>)}</nav></SheetContent></Sheet></div>
  </header>;
}
