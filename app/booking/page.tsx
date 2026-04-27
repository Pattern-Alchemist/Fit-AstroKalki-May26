'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import BookingCalendar from '@/components/sections/BookingCalendar';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';

export default function BookingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-zinc-950 min-h-screen text-white selection:bg-lime-400 selection:text-zinc-950">
      <Header isScrolled={isScrolled} />
      <BookingCalendar />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
