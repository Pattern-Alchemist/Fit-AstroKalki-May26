"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { generateWhatsAppLink, openWhatsApp } from "@/lib/whatsapp";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import CertificationsMarquee from "@/components/sections/CertificationsMarquee";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Results from "@/components/sections/Results";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import IntentCTA from "@/components/sections/IntentCTA";
import WhoThisIsFor from "@/components/sections/WhoThisIsFor";
import WhatHappensAfter from "@/components/sections/WhatHappensAfter";
import MessageIf from "@/components/sections/MessageIf";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import StickyWhatsAppBar from "@/components/common/StickyWhatsAppBar";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-lime-400 selection:text-zinc-950">
      <Header isScrolled={isScrolled} />
      <Hero />
      <CertificationsMarquee />
      <About />
      <Programs />
      <Results />
      <IntentCTA />
      <Stats />
      <Testimonials />
      <WhoThisIsFor />
      <WhatHappensAfter />
      <MessageIf />
      <Process />
      <FAQ />
      <FinalCta />
      <Footer />
      <FloatingWhatsApp />
      <StickyWhatsAppBar />
    </div>
  );
}
