"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-300 rounded-full flex items-center justify-center text-zinc-950 font-bold">
                K
              </div>
              <div>
                <p className="font-bold text-white text-lg">Kaustubh</p>
                <p className="text-xs text-zinc-500">Personal Trainer</p>
              </div>
            </div>
          </div>

          {/* Statement */}
          <div className="space-y-4 md:col-span-2">
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              {siteConfig.footer.statement}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Contact
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-zinc-300 hover:text-lime-400 transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Based in
            </p>
            <p className="text-sm text-zinc-300">{siteConfig.city}, India</p>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Follow
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-lime-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-lime-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-8 md:pt-12 space-y-4">
          <p className="text-center text-sm text-zinc-400">
            {siteConfig.footer.closing}
          </p>
          <p className="text-center text-xs text-zinc-600">
            © {currentYear} {siteConfig.trainerName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
