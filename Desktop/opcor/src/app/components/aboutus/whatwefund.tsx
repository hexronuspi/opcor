"use client";

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function WhatWeFund() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const h2Refs = useRef<HTMLHeadingElement[]>([]);

    useLayoutEffect(() => {
        const addH2Ref = (el: HTMLHeadingElement | null) => {
            if (el && !h2Refs.current.includes(el)) {
                h2Refs.current.push(el);
            }
        };
        
        sectionRef.current?.querySelectorAll('h2[data-text], h3[data-text]').forEach(el => {
            addH2Ref(el as HTMLHeadingElement);
        });

        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none none',
                }
            });

            h2Refs.current.forEach((h2, index) => {
                tl.from(h2, {
                    text: "",
                    duration: (h2.dataset.text?.length || 0) * 0.08,
                    ease: 'none',
                }, `+=${index > 0 ? 0.2 : 0}`);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="font-sans text-gray-800">            
            <section ref={sectionRef} className="relative bg-[#F0ECE5] py-16 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 mb-12">
                        <div className="mb-8 p-4 rounded-lg">
                            <span className='text-red-500 font-semibold'>No Chances</span>
                            <div className="flex items-start">
                                <div className="ml-3">
                                    <p className="text-base md:text-lg text-gray-800 font-semibold mb-2">
                                        “Evaluating an LLM on different languages and benchmarking its performance on some QA dataset.”
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 p-4 rounded-lg">
                            <span className='text-yellow-500 font-semibold'>Low Chances</span>
                            <div className="flex items-start">
                                <div className="ml-3">
                                    <p className="text-base md:text-lg text-gray-800 font-semibold">
                                        “Longer context makes it worse for an LLM to summarise which information to keep and what to remove?”
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="p-4 rounded-lg">
                            <span className='text-green-500 font-semibold'>Good Chances</span>
                            <div className="flex items-start">
                                <div className="ml-3">
                                    <p className="text-base md:text-lg text-gray-800 font-semibold mb-2">
                                        “An LLM is fed with multiple languages. Can it build an entire language, its dialect, pronunciation etc. alone?”
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <p className="text-base md:text-lg text-gray-600 italic">
                                Ensure your results are logically consistent. Do not attempt to prove statements that are objectively incorrect. However, results that challenge prior proofs or provide empirical findings are good to go. We mostly fund projects which genuinely have the potential to transform tech or science. We seek out ideas that challenge the status quo and are built on a foundation of deep, original thought.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}