'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, CornerDownRight, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type TextAnswer = { type: 'text'; content: string };
type ListAnswer = { type: 'list'; content: string[] };
type Column = { title: string; items: string[] };
type ColumnsAnswer = { type: 'columns'; content: Column[] };
type Answer = TextAnswer | ListAnswer | ColumnsAnswer;
type FaqItem = { question: string; answer: Answer };

const faqData: FaqItem[] = [
    {
        question: 'Is my research a good fit?',
        answer: {
            type: 'text',
            content:
                'We fund competitive, high-velocity research poised for execution. We do not fund pure ideation. To qualify, submit a concise proposal outlining your core hypothesis, completed groundwork, and anticipated outputs. Show us code, not just concepts.',
        },
    },
    {
        question: 'What research vectors are you funding?',
        answer: {
            type: 'columns',
            content: [
                {
                    title: "Primary Vectors",
                    items: [
                        '**New Approaches:** Solving foundational problems in AI, Robotics, and Compute Engineering.',
                        '**New Paradigms:** Empirical research into safety frameworks, interpretability, and machine cognition.',
                    ],
                }
            ],
        },
    },
    {
        question: 'Who is eligible to apply?',
        answer: {
            type: 'text',
            content:
                'Currently we focus only on people who live in India.  Researchers, students, or dropouts. We evaluate based on your proposal and proof of capability (GitHub/Papers). We do not care about credentials, university rankings, or GPA.',
        },
    },
    {
        question: 'Why apply for an OPCOR grant?',
        answer: {
            type: 'list',
            content: [
                'Fast, bureaucracy-free funding.',
                'Access to compute resources.',
                'Network with high-agency builders and researchers.',
                'Total autonomy over your work.',
            ],
        },
    },
    {
        question: 'Are there spending restrictions or audits?',
        answer: {
            type: 'text',
            content:
                'We operate on trust. If you are 18+, you have full autonomy to use the funds for research or personal sustenance. For larger grants, funds may be tranche-based, contingent on milestone progress reports. We trust you to make the right decisions for your work.',
        },
    },
    {
        question: 'Do you take equity or IP?',
        answer: {
            type: 'text',
            content:
                'No. We take zero equity and claim no IP. We only ask that you open-source your findings to accelerate the field. We encourage, but do not strictly require, citing OPCOR in your published work.',
        },
    },
    {
        question: 'What is the grant size?',
        answer: {
            type: 'text',
            content:
                'As a self-funded initiative, we do not have fixed grant sizes. Awards typically cover compute costs + living expenses. We currently fund 0-1 high-conviction projects per month.',
        },
    },
    {
        question: 'How can I support OPCOR?',
        answer: {
            type: 'text',
            content:
                'We do not accept direct donations. However, we invite external collaborators to co-fund specific projects. If you want to back a specific researcher we have vetted, please contact us directly.',
        },
    }
];

const RenderBoldText = ({ text }: { text: string }) => {
    const parts = text.split('**');
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <span key={i} className="font-semibold text-[#1A237E]">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};

const AccordionItem = ({ 
    item, 
    index, 
    isOpen, 
    toggle 
}: { 
    item: FaqItem; 
    index: number; 
    isOpen: boolean; 
    toggle: () => void 
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current || !innerRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        if (isOpen) {
            gsap.set(contentRef.current, { height: 'auto' });
            gsap.from(contentRef.current, { height: 0, duration: 0.4, ease: "expo.out" });
            
            gsap.fromTo(innerRef.current, 
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.1 }
            );
        } else {
            gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: "power3.inOut" });
            gsap.to(innerRef.current, { opacity: 0, duration: 0.2 });
        }

        return () => { tl.kill(); };
    }, [isOpen]);

    const renderAnswer = (answer: Answer) => {
        switch (answer.type) {
            case 'text':
                return <p className="text-lg md:text-xl font-serif text-gray-700 leading-relaxed max-w-4xl">{answer.content}</p>;
            case 'list':
                return (
                    <ul className="space-y-4 text-lg md:text-xl font-serif text-gray-700 leading-relaxed">
                        {answer.content.map((li, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1A237E] flex-shrink-0" />
                                <span>{li}</span>
                            </li>
                        ))}
                    </ul>
                );
            case 'columns':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#111]/10 pt-6 mt-4">
                        {answer.content.map((col, i) => (
                            <div key={i} className="relative">
                                {i === 1 && <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-[1px] bg-[#111]/10" />}
                                
                                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">
                                    {col.title}
                                </h3>
                                <ul className="space-y-4">
                                    {col.items.map((it, j) => (
                                        <li key={j} className="text-base md:text-lg font-serif text-gray-700 leading-relaxed">
                                            <RenderBoldText text={it} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="group border-t border-[#111]/10 first:border-t-0">
            <button
                onClick={toggle}
                className={`w-full py-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start text-left transition-all duration-300 ${isOpen ? 'bg-white/60 -mx-4 px-4 rounded-lg shadow-sm' : 'hover:bg-white/40 hover:px-4 hover:-mx-4 hover:rounded-lg'}`}
            >
                <div className="md:w-24 flex-shrink-0 pt-1">
                    <span className={`font-mono text-xs tracking-widest transition-colors duration-300 ${isOpen ? 'text-[#1A237E] font-bold' : 'text-gray-400'}`}>
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                </div>

                <div className="flex-grow">
                    <h3 className={`text-xl md:text-2xl font-medium tracking-tight leading-snug transition-colors duration-300 ${isOpen ? 'text-[#1A237E]' : 'text-[#111]'}`}>
                        {item.question}
                    </h3>
                </div>

                <div className="flex-shrink-0 pt-1">
                    <div className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-[#1A237E] bg-[#1A237E] text-white rotate-180' : 'border-[#111]/20 text-[#111] rotate-0'}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                </div>
            </button>

            <div ref={contentRef} className="h-0 overflow-hidden">
                <div ref={innerRef} className="pl-0 md:pl-[calc(6rem+12px)] pr-4 md:pr-12 pb-10 opacity-0">
                   <div className="mb-4 opacity-30">
                        <CornerDownRight size={16} className="text-[#1A237E]" />
                   </div>
                   {renderAnswer(item.answer)}
                </div>
            </div>
        </div>
    );
};

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".gsap-faq-header", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={containerRef} 
            className="relative bg-[#F2F0EB] py-24 md:py-32 min-h-screen font-sans selection:bg-[#8B5CF6] selection:text-white"
        >
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
                <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#111]/10 pb-8">
                    <div className="md:col-span-3">
                         <div className="gsap-faq-header flex items-center gap-2 text-[#8B5CF6]">
                            <BookOpen size={16} />
                            <span className="font-mono text-xs uppercase tracking-widest font-bold">Protocol</span>
                         </div>
                    </div>
                    <div className="md:col-span-9">
                        <h2 className="gsap-faq-header text-4xl md:text-6xl font-bold tracking-tighter text-[#111] mb-6">
                            Common <span className="font-serif italic font-light text-[#8B5CF6]">Inquiries</span>
                        </h2>
                        <p className="gsap-faq-header text-base md:text-lg text-gray-500 max-w-xl font-light leading-relaxed">
                            Clarifications regarding the grant mechanics, evaluation criteria, and funding philosophy.
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    {faqData.map((item, index) => (
                        <AccordionItem 
                            key={index} 
                            index={index} 
                            item={item} 
                            isOpen={activeIndex === index} 
                            toggle={() => setActiveIndex(activeIndex === index ? null : index)} 
                        />
                    ))}
                    <div className="w-full h-[1px] bg-[#8B5CF6]/10" />
                </div>
                <div className="mt-16 text-center">
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                        Still have questions? <a href="mailto:hexronus@gmail.com" className="text-[#8B5CF6] border-b border-[#8B5CF6] hover:border-transparent transition-all">Direct Contact</a>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Faq;