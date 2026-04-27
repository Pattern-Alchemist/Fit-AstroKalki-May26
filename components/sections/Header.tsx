"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Results", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Intake", href: "/intake" },
    { label: "Booking", href: "/booking" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Videos", href: "/videos" },
    { label: "Nutrition", href: "/nutrition" },
  ];

  const whatsappLink = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    "Hi Kaustubh, I'd like to book my free 15-min consult."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-lime-400 to-lime-300 rounded-full flex items-center justify-center text-zinc-950 font-bold text-lg md:text-xl">
              K
            </div>
            <span className="hidden sm:inline text-white font-bold text-lg md:text-xl tracking-tight">
              Kaustubh
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-lime-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all hover:shadow-lg hover:shadow-lime-400/20"
            >
              Book Free Consult
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-zinc-300 hover:text-lime-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2.5 bg-lime-400 text-zinc-950 font-semibold rounded-lg text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Free Consult
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
