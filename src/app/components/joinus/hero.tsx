'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowUpRight,  Minus, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JoinUsHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".gsap-line", 
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 2, stagger: 0.1 }
      );

      tl.fromTo(".gsap-meta",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.05 },
        "-=1.5"
      );

      tl.fromTo(".gsap-title-char",
        { y: 120, opacity: 0, rotateZ: 2 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 1.8, stagger: 0.03, ease: "power4.out" },
        "-=1"
      );

      tl.fromTo(".gsap-content:not(.no-animate)",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        "-=1.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#F2F0EB] text-[#111] font-sans selection:bg-[#1A237E] selection:text-[#F2F0EB] overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-between px-6 lg:px-12 max-w-[1600px] mx-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-full w-[1px] bg-[#111]/5 hidden md:block" />
        ))}
      </div>


      <div className="relative z-10 flex-grow flex flex-col justify-center px-6 lg:px-12 py-20 max-w-[1600px] mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12">
          
          <div className="lg:col-span-7 relative">
            <div className="overflow-hidden mb-2">
              <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] leading-[0.85] tracking-tighter font-semibold text-[#111]">
                <div className="overflow-hidden"><span className="gsap-title-char inline-block">I</span><span className="gsap-title-char inline-block">n</span><span className="gsap-title-char inline-block">t</span><span className="gsap-title-char inline-block">e</span><span className="gsap-title-char inline-block">l</span><span className="gsap-title-char inline-block">l</span><span className="gsap-title-char inline-block">e</span><span className="gsap-title-char inline-block">c</span><span className="gsap-title-char inline-block">t</span></div>
                <div className="overflow-hidden flex items-baseline gap-4">
                  <span className="font-serif font-light italic text-[#8B5CF6] text-5xl md:text-7xl gsap-title-char opacity-0">meets</span>
                  <div className="gsap-title-char inline-block">I</div><div className="gsap-title-char inline-block">n</div><div className="gsap-title-char inline-block">t</div><div className="gsap-title-char inline-block">u</div><div className="gsap-title-char inline-block">i</div><div className="gsap-title-char inline-block">t</div><div className="gsap-title-char inline-block">i</div><div className="gsap-title-char inline-block">o</div><div className="gsap-title-char inline-block">n</div>
                </div>
              </h1>
            </div>
            
            <div className="mt-12 max-w-xl">
              <p className="gsap-content text-lg md:text-xl leading-relaxed text-[#444] font-light">
                <span className="font-bold text-[#111]">We archive bodies of work.</span> 
                We believe collaboration is the key to everything. Sharing knowledge is the most effective way to grow together, and advancing the frontiers of AI and Engineering is not possible alone.
              </p>
            </div>

            <div className="gsap-content mt-12 flex items-center gap-6">
              <a href="mailto:hexronus@gmail.com" className="group relative inline-flex items-center gap-3 px-0 py-2">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#111]/20 group-hover:bg-[#1A237E] transition-colors duration-300" />
                <Mail className="w-5 h-5 text-[#1A237E]" />
                <span className="font-mono text-sm uppercase tracking-widest font-bold text-[#111]">
                  Contact
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#1A237E] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <div 
              className="gsap-content no-animate relative w-full bg-white border border-[#111]/10 p-1 transition-all duration-500 hover:shadow-2xl hover:shadow-[#1A237E]/10 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute -top-1 left-4 right-4 h-1 bg-[#1A237E]/20" />

              <div className="relative bg-[#FBFBFB] p-8 md:p-10 h-full flex flex-col justify-between border border-[#111]/5">
                
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-3xl font-serif italic text-[#111] mb-1">The Grant</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Ref: G-2026-ALPHA</p>
                  </div>
                  <div className={`transition-transform duration-500 ${isHovered ? 'rotate-90' : 'rotate-0'}`}>
                    {isHovered ? <Plus size={24} className="text-[#1A237E]" /> : <Minus size={24} className="text-[#ccc]" />}
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-[2px] bg-[#1A237E] h-auto" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We support exceptional researchers working on foundational problems in AI, computation, and Engineering. Our grants enable innovative work that drives real-world impact and sets new standards in the field.
                      </p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dashed border-[#111]/10">
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Date</span>
                        <span className="block text-lg font-semibold text-[#111]">Mid 2026</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Cycle Status</span>
                        <span className="flex items-center gap-2 text-lg font-semibold text-[#111]">
                          Upcoming
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mb-1 ml-1" />
                        </span>
                      </div>
                   </div>
                </div>
                
              </div>
            </div>

            <div className="gsap-content no-animate mt-6 flex justify-between items-end">
               <p className="text-xs font-serif italic text-gray-400 max-w-xs">
                 &quot;Curiosity is the Joy of the Few.&quot;
               </p>
               
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default JoinUsHero;