'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, AlertCircle, CheckCircle2, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type CriteriaCardProps = {
    status: 'rejected' | 'unlikely' | 'accepted';
    label: string;
    hypothesis: string;
    index: number;
};

const CriteriaCard = ({ status, label, hypothesis, index }: CriteriaCardProps) => {
    const config = {
        rejected: {
            color: 'text-red-800',
            borderColor: 'border-red-900/20',
            bgHover: 'hover:bg-red-50',
            icon: <X className="w-5 h-5" />,
        },
        unlikely: {
            color: 'text-amber-700',
            borderColor: 'border-amber-900/20',
            bgHover: 'hover:bg-amber-50',
            icon: <AlertCircle className="w-5 h-5" />,
        },
        accepted: {
            color: 'text-[#22C55E]',
            borderColor: 'border-[#22C55E]/30',
            bgHover: 'hover:bg-green-50',
            icon: <CheckCircle2 className="w-5 h-5" />,
        }
    };

    const style = config[status];

    return (
        <div className={`gsap-card group relative flex flex-col p-8 border-l md:border-l-0 md:border-t border-b border-black/10 ${style.bgHover} transition-colors duration-500 min-h-[320px]`}>
            <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-black/5" />
            
            <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-xs text-gray-400">0{index + 1}</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${style.borderColor} ${style.color} bg-white/50 backdrop-blur-sm`}>
                    {style.icon}
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold">{label}</span>
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-end">
                <div className="mb-4 overflow-hidden">
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wide mb-2 opacity-0 gsap-fade-up">
                        Case Study
                    </h3>
                    <p className={`text-xl md:text-2xl font-serif leading-snug text-[#111] opacity-0 gsap-fade-up translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
                        &quot;{hypothesis}&quot;
                    </p>
                </div>
            </div>

        </div>
    );
};

export default function WhatWeFund() {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%'
                }
            });

            tl.from(".gsap-header-line", { scaleX: 0, transformOrigin: "left", duration: 1.5, ease: "expo.out" });
            tl.from(".gsap-header-text", { y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=1");

            tl.fromTo(".gsap-card", 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", clearProps: "all" },
                "-=0.5"
            );

            tl.to(".gsap-fade-up", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=1");

            tl.from(".gsap-footer", { opacity: 0, y: 20, duration: 1 }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#F2F0EB] text-[#111] py-24 md:py-32 px-6 lg:px-12 font-sans overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-multiply" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            <div className="relative z-10 max-w-[1600px] mx-auto">
                
                <div className="mb-16 md:mb-24">
                    <div className="gsap-header-line w-full h-[1px] bg-black/20 mb-6" />
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                        <div className="overflow-hidden">
                            <h2 className="gsap-header-text text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                                Funding <span className="font-serif italic font-light text-[#8B5CF6]">Matrix</span>
                            </h2>
                        </div>
                        <div className="gsap-header-text flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                            <Scale className="w-4 h-4 text-[#1A237E]" />
                            <span>Evaluation</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10 md:border-none">
                    
                    <CriteriaCard 
                        index={0}
                        status="rejected"
                        label="No Chances"
                        hypothesis="Evaluating an LLM on different languages and benchmarking its performance on some QA dataset."
                    />

                    <CriteriaCard 
                        index={1}
                        status="unlikely"
                        label="Low Chances"
                        hypothesis="Longer context makes it worse for an LLM to summarise which information to keep and what to remove?"
                    />

                    <CriteriaCard 
                        index={2}
                        status="accepted"
                        label="High Potential"
                        hypothesis="An LLM is fed with multiple languages. Can it build an entire language, its dialect, pronunciation etc. alone?"
                    />

                </div>

                <div className="gsap-footer mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-black/10">
                    <div className="lg:col-span-3">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-[#8B5CF6]">The Standard</h4>
                    </div>
                    <div className="lg:col-span-9">
                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-800">
                            <span className="text-[#8B5CF6] font-bold">Do not prove the obvious.</span> 
                            <span className="opacity-70"> We fund projects that challenge the axiom. Ensure your results are logically consistent. Do not attempt to prove statements that are objectively incorrect. However, results that challenge prior proofs or provide empirical findings are good to go.</span>
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                             <div className="h-[1px] w-12 bg-black/20" />
                             <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Deep Original Thought Required</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}