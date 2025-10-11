"use client"
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function OpcorPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const h2Refs = useRef<HTMLHeadingElement[]>([]);
    h2Refs.current = [];

    const [fontSize, setFontSize] = useState('48px');

    const addToRefs = (el: HTMLHeadingElement | null) => {
        if (el && !h2Refs.current.includes(el)) {
            h2Refs.current.push(el);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const vw = window.innerWidth * 0.10;
            const newSize = Math.max(48, Math.min(vw, 180));
            setFontSize(`${newSize}px`);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none none',
                }
            });

            h2Refs.current.forEach((h2, index) => {
                const prevH2 = h2Refs.current[index - 1];
                
                tl.call(() => {
                    h2.classList.add('is-typing');
                    if(prevH2) prevH2.classList.remove('is-typing');
                });

                tl.to(h2, {
                    text: {
                        value: h2.dataset.text || "",
                    },
                    duration: (h2.dataset.text?.length || 0) * 0.1,
                    ease: 'none',
                });
            });
            
            tl.call(() => {
                const lastH2 = h2Refs.current[h2Refs.current.length - 1];
                if(lastH2) lastH2.classList.remove('is-typing');
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [fontSize]);

    const words = ["Research", "Culture", "Real", "Problems"];

    return (
        <main className="bg-[#F0ECE5] font-sans">
            <style jsx global>{`
                /* Style for the live blinking cursor */
                .is-typing::after {
                    content: '_';
                    display: inline-block;
                    font-weight: 400; /* Lighter than the bold text */
                    animation: blink-animation 0.7s infinite;
                    transform: translateY(-0.1em); /* Fine-tune cursor position */
                }

                @keyframes blink-animation {
                    50% { opacity: 0; }
                }
            `}</style>
            <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-end md:justify-start items-center md:items-start overflow-hidden p-4 sm:p-8 md:p-12">
                <div 
                    className="absolute bg-[#9B8AFB] z-0"
                    style={{
                        width: '150%',
                        height: '150%',
                        top: '-25%',
                        left: '10%',
                        transform: 'rotate(35deg)',
                    }}
                ></div>

                <div className="absolute top-1/2 md:top-2/5 md:-left-3 -left-1 -translate-y-1/2 w-full z-0 pointer-events-none pt-[140%] md:pt-0 md:pl-[50%]">
                    <div className="container mx-auto px-4">
                        {words.map((word) => (
                             <h2 
                                key={word}
                                ref={addToRefs} 
                                data-text={word}
                                style={{ 
                                    fontSize: fontSize,
                                    minHeight: fontSize,
                                    lineHeight: 1, 
                                }}
                                className="font-bold text-gray-300 opacity-50 whitespace-nowrap"
                            ></h2>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 w-full flex justify-center md:justify-start mt-auto md:mt-0">
                    <div className="max-w-xl md:max-w-md lg:max-w-lg p-6 rounded-lg text-gray-800">
                        <Quote className="text-gray-600 mb-4 transform scale-x-[-1]" size={48} strokeWidth={1.5} />
                            <p className="italic text-lg md:text-xl text-justify leading-relaxed">
                                Our mission is to establish us as a globally unparalleled research hub, uniting a community of exceptional innovators to advance the frontier of computation and science. We are more biased towards foundational work in AI and science that drives real-world impact, and aim to set a definitive standard that rivals the best labs worldwide. We are a firm believer that merit is better than background, we evaluate talent based on the collective body of your work, not just your resume. Together, we will consistently redefine the cutting edge of our field.
                            </p>
                            <footer className="mt-6 text-right">
                                <p className="font-medium text-lg">— Aditya Raj</p>
                            </footer>
                    </div>
                </div>
            </section>
        </main>
    );
}