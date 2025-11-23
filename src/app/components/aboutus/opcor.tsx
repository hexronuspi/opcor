"use client"
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function OpcorPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const h2Refs = useRef<HTMLHeadingElement[]>([]);
    h2Refs.current = [];

    const addToRefs = (el: HTMLHeadingElement | null) => {
        if (el && !h2Refs.current.includes(el)) {
            h2Refs.current.push(el);
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none none',
                }
            });

            tl.fromTo(".gsap-cursor-line", 
                { scaleY: 0 }, 
                { scaleY: 1, duration: 1.5, ease: "expo.out" }
            );

            h2Refs.current.forEach((h2, index) => {
                const prevH2 = h2Refs.current[index - 1];
                
                tl.call(() => {
                    h2.classList.add('is-active');
                    if(prevH2) prevH2.classList.remove('is-active');
                });

                tl.to(h2, {
                    text: {
                        value: h2.dataset.text || "",
                        delimiter: "" 
                    },
                    duration: (h2.dataset.text?.length || 0) * 0.08, 
                    ease: 'none',
                });
                
                tl.to({}, { duration: 0.3 });
            });
            
            tl.call(() => {
                const lastH2 = h2Refs.current[h2Refs.current.length - 1];
                if(lastH2) lastH2.classList.remove('is-active');
            });
            gsap.fromTo(".gsap-manifesto-card",
                { y: 100, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1.5, 
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 40%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const words = ["RESEARCH", "CULTURE", "REAL", "PROBLEMS"];

    return (
        <main className="bg-[#F2F0EB] font-sans selection:bg-[#1A237E] selection:text-white overflow-hidden">
            <style jsx global>{`
                /* The "Krishna Blue" Cursor */
                .is-active::after {
                    content: '';
                    display: inline-block;
                    width: 0.6em; /* Block cursor */
                    height: 0.8em;
                    background-color: #8B5CF6; 
                    margin-left: 10px;
                    vertical-align: baseline;
                    animation: blink-animation 0.9s infinite;
                }

                @keyframes blink-animation {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>

            <section ref={sectionRef} className="relative min-h-screen flex flex-col lg:flex-row">
                
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-multiply" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />

                <div className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#111]/10">
                    
                    <div className="gsap-cursor-line absolute left-8 md:left-16 top-0 bottom-0 w-[1px] bg-[#1A237E]/20 origin-top" />

                    <div className="relative z-10 ml-6 md:ml-12">
                        <div className="flex flex-col items-start gap-2">
                            {words.map((word) => (
                                <h2 
                                    key={word}
                                    ref={addToRefs} 
                                    data-text={word}
                                    className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-bold text-[#111] leading-[0.85] tracking-tighter opacity-100"
                                    style={{ fontVariantNumeric: 'tabular-nums' }}
                                >
                                </h2>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center items-center p-6 md:p-16 bg-[#F2F0EB]">
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                         <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-gradient-to-b from-[#1A237E]/5 to-transparent rounded-full blur-3xl" />
                    </div>
                    <div className="gsap-manifesto-card relative max-w-lg w-full">
                        
                        <div className="absolute -left-3 -top-3 w-6 h-6 border-l border-t border-[#1A237E] opacity-50" />
                        <div className="absolute -right-3 -bottom-3 w-6 h-6 border-r border-b border-[#1A237E] opacity-50" />

                        <div className="relative bg-white border border-[#111]/5 p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(26,35,126,0.1)]">
                            <div className="flex justify-between items-start mb-8">
                                <Quote className="text-[#1A237E] fill-[#1A237E]/10 transform rotate-180" size={32} strokeWidth={1} />
                                <span className="font-mono text-[10px] border border-black/10 px-2 py-1 uppercase tracking-widest text-gray-500">
                                    The Mission
                                </span>
                            </div>

                            <div className="space-y-6">
                                <p className="text-lg md:text-xl font-serif leading-relaxed text-[#111] text-justify">
                                    <span className="font-bold text-[#8B5CF6]">We do not only seek to improve but to redefine.</span> Our mission is to establish a globally unparalleled research hub, uniting exceptional innovators to advance the frontier of computation. 
                                </p>
                                <p className="text-lg md:text-xl font-serif leading-relaxed text-gray-600 text-justify">
                                    We value the <span className="italic border-b border-[#1A237E]/30 text-[#111]">body of work</span> over the pedigree. We are biased towards foundational work around AI and Engineering that drives real-world impact, that can set a definitive standard that rivals the best labs in history.
                                </p>
                            </div>

                            <div className="mt-10 pt-6 border-t border-[#111]/10 flex items-center justify-between">
                                <div>
                                    <p className="font-serif italic text-lg text-[#111]">Aditya</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 z-50 pointer-events-none flex justify-between px-6 max-w-[1800px] mx-auto">
                    <div className="h-full w-[1px] bg-[#111]/5 hidden xl:block" />
                    <div className="h-full w-[1px] bg-[#111]/5 hidden xl:block" />
                </div>

            </section>
        </main>
    );
}