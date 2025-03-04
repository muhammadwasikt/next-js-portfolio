"use client";
import { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeController } from "./theme-controller";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // Track mobile menu state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white dark:bg-[#0a0a0a9a] backdrop-brightness-0 z-50 flex h-16 items-center px-4 md:px-6 gap-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open Menu">
            <MenuIcon className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-2 py-6">
            {["Home", "About", "Services" , "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link href="/" className="mr-6 font-extrabold text-xl max-lg:ml-4" prefetch={false}>
        WASI
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex gap-6">
        {["Home", "About", "Services" , "Projects", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors 
            hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none 
            disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 
            dark:focus:bg-gray-800 dark:focus:text-gray-50"
            prefetch={false}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Theme Controller */}
      <div className="ml-auto">
        <ThemeController />
      </div>
    </header>
  );
};

// Mobile Menu Icon
function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Navbar;
