'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const researchData = [
  {
    title: 'Memory',
    short: 'We believe that the future of AI is collaborative and it should augment human intelligence.',
  },
  {
    title: 'Intelligence',
    short: 'Exploring the boundaries of machine cognition and develop frameworks to assess genuine reasoning versus pattern matching.',
  },
  {
    title: 'Safety',
    short: 'AI will be used extensively, what are we doing to address AI risks and propose new safety paradigms.',
  },
  {
    title: 'Future',
    short: 'AI will integrate into our lives, but we must ensure it respects privacy and ethics. Cloud based models will store data, is there a risk of misuse? How to prevent it?',
  },
  {
    title: 'Attacks',
    short: 'Researching defense mechanisms and exploring whether universal protection is theoretically and practically achievable.',
  },
  {
    title: 'Science',
    short: 'Investigating the usage of AI with Science and taking a multidisciplinary approach.',
  },

];

const ResearchCard = ({ 
  item, 
  index, 
}: { 
  item: typeof researchData[0], 
  index: number
}) => {

  return (
    <div className="gsap-research-item w-full h-full">
      <div className="group relative h-full bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-[#6349E8]/30 overflow-hidden flex flex-col">
        
        {/* Index number background */}
        <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 text-[60px] md:text-[80px] lg:text-[100px] font-black text-gray-100/70 opacity-50 select-none group-hover:text-[#6349E8]/20 transition-colors duration-500">
          {index + 1}
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 text-black">
            {item.title}
          </h3>
          
          <p className="text-xs md:text-sm font-medium text-gray-600 mb-3 leading-relaxed">
            {item.short}
          </p>
                    
        
        </div>
      </div>
    </div>
  );
};

const ResearchHero = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!componentRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      
      // Fade in animation for cards
      gsap.from('.gsap-research-item', { 
        opacity: 0, 
        y: 30,
        stagger: 0.15, 
        duration: 0.8,
        ease: 'power3.out'
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={componentRef} 
      className="relative w-full min-h-screen bg-[#F0EEE9] overflow-hidden flex items-center"
    >
      {/* Background gradient layers */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#d9d3ff] to-[#C0B7F8]"
        style={{ clipPath: 'polygon(0 0, 15% 0, 60% 60%, 0% 100%)' }}
      ></div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-[#1a1a1a]">
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-6xl">
              At Open Collective Research, we explore the frontiers of computation and science through grant making and collaboration. 
              Our work spans critical areas that shape the future of AI—from understanding machine cognition to ensuring safety, 
              defending against adversarial threats, and building systems that enhance human capabilities while respecting privacy and ethics in all possible use cases.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
            {researchData.map((item, index) => (
              <ResearchCard key={index} item={item} index={index} />
            ))}
          </div>
          
          <div className="mt-6 md:mt-8">
            <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
              <span className="font-semibold">Note:</span> We are still in progress, we will open grant application by 1st January, 2026. All projects and publications can be found here, once funded, completed/in progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchHero;