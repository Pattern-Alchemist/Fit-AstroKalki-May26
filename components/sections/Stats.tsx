"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target]);

  return (
    <div ref={ref}>
      <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-lime-400">
        {count}
        <span className="text-3xl sm:text-4xl">{suffix}</span>
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {siteConfig.stats.map((stat, i) => (
            <div key={i} className="text-center">
              {typeof stat.value === "number" ? (
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              ) : (
                <div>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-lime-400">
                    {stat.value}
                    <span className="text-3xl sm:text-4xl">{stat.suffix}</span>
                  </p>
                </div>
              )}
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
