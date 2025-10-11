'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroData = {
  brandName: ["Open", "Collective", "Research"],
  brandNameFull: "Open Paradigm Collective",
};

const MergedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'power3.out' }
      });

      tl.from('.gsap-bg-char', { opacity: 0, stagger: 0.03, duration: 0.6 }, "-=0.6");
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full bg-[#F0EEE9] overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[#C0B7F8]"
        style={{ clipPath: 'polygon(0 0, 55% 0, 20% 100%, 0% 100%)' }}
      ></div>

      <div className="gsap-bg-text-container absolute inset-0 flex flex-col justify-center py-8 pointer-events-none z-0">
        <div style={{ marginLeft: '29%' }}>
          <h2 className="text-[clamp(2.5rem,15vw,10rem)] font-black leading-none tracking-tighter text-[#D9D4CF] text-left" aria-hidden="true">
            {heroData.brandName[0].split("").map((char, index) => (
              <span key={index} className="gsap-bg-char inline-block">{char}</span>
            ))}
          </h2>
        </div>
        
        <div style={{ marginLeft: '-10%' }}>
          <h2 className="text-[clamp(2.5rem,15vw,10rem)] font-black leading-none tracking-tighter text-[#D9D4CF] text-center" aria-hidden="true">
            {heroData.brandName[1].split("").map((char, index) => (
              <span key={index} className="gsap-bg-char inline-block">{char}</span>
            ))}
          </h2>
        </div>
        
        <div style={{ marginLeft: '13%' }}>
          <h2 className="text-[clamp(2.5rem,15vw,10rem)] font-black leading-none tracking-tighter text-[#D9D4CF] text-left pl-4 sm:pl-8 md:pl-20" aria-hidden="true">
            {heroData.brandName[2].split("").map((char, index) => (
              <span key={index} className="gsap-bg-char inline-block">{char}</span>
            ))}
          </h2>
        </div>
      </div>

      <div 
        className="absolute inset-0 flex flex-col justify-center py-8 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 55% 0, 20% 100%, 0% 100%)' }}
      >
        <div style={{ marginLeft: '29%' }}>
          <h2 className="text-[clamp(2.5rem,15vw,10rem)] font-black leading-none tracking-tighter text-[#6349E8] text-left" aria-hidden="true">
            {heroData.brandName[0].split("").map((char, index) => (
              <span key={index} className="gsap-bg-char inline-block">{char}</span>
            ))}
          </h2>
        </div>
        
        <div style={{ marginLeft: '-10%' }}>
          <h2 className="text-[clamp(2.5rem,15vw,10rem)] font-black leading-none tracking-tighter text-[#6349E8] text-center" aria-hidden="true">
            {heroData.brandName[1].split("").map((char, index) => (
              <span key={index} className="gsap-bg-char inline-block">{char}</span>
            ))}
          </h2>
        </div>
        
        <div style={{ marginLeft: '13%' }}>
          <h2 className="text-[clamp(2.5rem,15vw,10rem)] font-black leading-none tracking-tighter text-[#6349E8] text-left pl-4 sm:pl-8 md:pl-20" aria-hidden="true">
            {heroData.brandName[2].split("").map((char, index) => (
              <span key={index} className="gsap-bg-char inline-block">{char}</span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MergedHero;