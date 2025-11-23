'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGear } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const heroData = {
  brandName: ["Open", "Collective", "Research"],
  brandNameFull: "Open Collective Research",
  subtitle: "We fund the outliers, the obsessives, and the builders working to build something genuinely new.",
  showStats: false,
  stats: [
    { value: "50+", label: "Active Projects" },
    { value: "$2M+", label: "Grants Distributed" },
    { value: "15", label: "Research Areas" }
  ]
};

const NoiseTexture = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
    <svg className="w-full h-full">
      <filter id="luxuryNoise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#luxuryNoise)" />
    </svg>
  </div>
);

const SwissGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
    <div 
      className="w-full h-full"
      style={{
        backgroundImage: `
          linear-gradient(to right, #000 1px, transparent 1px),
          linear-gradient(to bottom, #000 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }}
    />
  </div>
);

const FloatingElement = ({ delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay
      });
    }
  }, [delay]);

  return (
    <div ref={ref} className={`absolute opacity-10 ${className}`}>
      <div className="w-1 h-1 bg-slate-400 rounded-full" />
    </div>
  );
};

const GearsAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".gear-cw-fast", {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });
      
      gsap.to(".gear-item", {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute right-0 top-0 h-full w-[40%] hidden lg:flex flex-col items-end justify-center gap-12 pr-12 pointer-events-none z-0 opacity-20 overflow-hidden">
      <div className="gear-item relative right-12">
        <FaGear className="gear-cw-fast text-[8rem] text-slate-600" />
      </div>
      
      <div className="gear-item relative right-24 -mt-16">
        <FaGear className="gear-cw-fast text-[12rem] text-slate-800" />
      </div>
      
      <div className="gear-item relative right-8 -mt-16">
        <FaGear className="gear-cw-fast text-[10rem] text-slate-600" />
      </div>

      <div className="gear-item relative right-32 -mt-14">
        <FaGear className="gear-cw-fast text-[8rem] text-slate-800" />
      </div>
    </div>
  );
};

const MergedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      
      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: 'power3.out' }
      });

      tl.from('.gsap-brand-char', { 
        opacity: 0, 
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.2)'
      })
      .from('.gsap-tagline', { 
        opacity: 0, 
        y: 50,
        duration: 1,
        ease: 'power3.out' 
      }, "-=0.4")
      .from('.gsap-subtitle', { 
        opacity: 0, 
        y: 30,
        duration: 0.8 
      }, "-=0.6")
      .from('.gsap-stats', { 
        opacity: 0, 
        y: 40,
        stagger: 0.1,
        duration: 0.6 
      }, "-=0.4")
      .from('.gsap-cta', { 
        opacity: 0, 
        scale: 0.95,
        duration: 0.6 
      }, "-=0.2");
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full bg-gradient-to-br from-[#FEFEFE] via-[#F8F7F4] to-[#F2F0EB] overflow-hidden">
      
      <NoiseTexture />
      <SwissGrid />
      <GearsAnimation />
      
      <FloatingElement delay={0} className="top-1/4 left-1/4" />
      <FloatingElement delay={1} className="top-1/3 right-1/3" />
      <FloatingElement delay={2} className="bottom-1/3 left-1/5" />
      <FloatingElement delay={1.5} className="top-1/2 right-1/4" />
      
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 30% 40%, 
            rgba(139, 92, 246, 0.15) 0%, 
            transparent 70%)`
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col justify-center pt-10">
        <div className="max-w-8xl mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="mb-12">
            {heroData.brandName.map((word, wordIndex) => (
              <div key={wordIndex} className="overflow-hidden">
                <h1 className="text-[clamp(3rem,12vw,11rem)] font-light leading-[0.85] tracking-[-0.02em] text-slate-900">
                  {word.split("").map((char, charIndex) => (
                    <span 
                      key={`${wordIndex}-${charIndex}`} 
                      className="gsap-brand-char inline-block"
                      style={{
                        fontFamily: 'InterVariable, "SF Pro Display", system-ui, sans-serif',
                        fontWeight: '700',
                        color: '#8B5CF6'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            <div className="lg:col-span-6">
              <p className="gsap-subtitle text-xl md:text-2xl leading-relaxed text-slate-600 font-light max-w-2xl">
                {heroData.subtitle}
              </p>
            </div>

            {heroData.showStats && (
              <div className="lg:col-span-6 lg:justify-self-end">
                <div className="flex flex-wrap gap-8">
                  {heroData.stats.map((stat, index) => (
                    <div key={index} className="gsap-stats text-center">
                      <div className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-500 uppercase tracking-widest font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default MergedHero;