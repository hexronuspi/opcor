'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

type TextAnswer = { type: 'text'; content: string };
type ListAnswer = { type: 'list'; content: string[] };
type Column = { title: string; items: string[] };
type ColumnsAnswer = { type: 'columns'; content: Column[] };
type Answer = TextAnswer | ListAnswer | ColumnsAnswer;
type FaqItem = { question: string; answer: Answer };

// Type for DOM element with animation timeline attached
type FaqItemElement = HTMLDivElement & { animation?: gsap.core.Timeline };

const faqData: FaqItem[] = [
    {
        question: 'How can I determine if my research project is a good fit for your grant?',
        answer: {
            type: 'text',
            content:
                'We fund research projects through a competitive grant process, seeking to support works that needs funding and poised for take off. To be considered, researchers must submit a comprehensive proposal that outlines their project\'s core ideas and the hypotheses they aim to prove but also clearly defines the anticipated outputs upon successful achievement of their goals. It is crucial that applicants demonstrate tangible progress, as we may not fund projects that are solely in the ideation stage. Your submission should include a document of a few pages detailing the substantial amount of work already completed, which forms the foundation for the research questions you intend to solve.',
        },
    },
    {
        question: 'What kind of research ideas are you looking for?',
        answer: {
            type: 'columns',
            content: [
                {
                    title: "We're looking for bold, fresh ideas in two categories:",
                    items: [
                        '**New approaches:** Research using AI to tackle real-world challenges or solving some of the foundational problems around AI.',
                        '**New paradigms:** Empirical research exploring foundational questions on how AI can be a help to humanity. These ideas aim to create new frameworks, or principles.',
                    ],
                },
                {
                    title:
                        'Whether a new approach or a new paradigm, we seek ideas tackling foundational challenges:',
                    items: [
                        '**Memory:** Enhancing collaboration with AI by improving information retention and recall. We believe that the future of AI is collaborative and it should augment human intelligence.',
                        '**Intelligence:** Are models really capable of thinking? If so, how can we measure and evaluate this capability and to what extent?',
                        '**Safety:** Is the current direction of AI Safety sufficient to address potential risks and challenges? If not, what do you propose?',
                        '**Future:** Is there a future where AI can seamlessly integrate into our daily lives while respecting privacy and ethical considerations?',
                        '**Attacks:** How can we better defend against adversarial attacks on AI systems? Is there a foundational way to block all attacks?',
                    ],
                },
            ],
        },
    },
    {
        question: 'Who can participate?',
        answer: {
            type: 'text',
            content:
                'This call for research is open to any one who can contribute to the field of AI and its applications, We only care about your proposal and your past related work to support the proposal. We do not care about anything else.',
        },
    },
    {
        question: 'Why should I participate?',
        answer: {
            type: 'list',
            content: [
                'Receive funding and support for your research.',
                'Contribute to foundational research in computation and science.',
                'Collaborate with fellow researchers and learn from each other.',
            ],
        },
    },
    {
        question: 'Will the funds be monitored or audited?',
        answer: {
            type: 'text',
            content:
                'Our funding is available to individuals who are 18 years of age or older on the date of receiving the grant. We operate on a principle of trust, and as such, we generally do not require information on where you choose to utilize the funds. You have the autonomy to use the grant to advance your research or for personal purposes. We encourage you to reflect on whether your use of the funds aligns with your personal values and goals, and we trust you to make the decision that is right for you. For larger grants, we may opt to disburse the amount in installments. While the first installment is provided directly, the release of subsequent payments may require the submission of a progress report to ensure milestones are being met.',
        },
    },
        {
        question: 'What will be the size of the grants and how many projects do you plan to fund?',
        answer: {
            type: 'text',
            content:
                'This is a self funded project, The grants are directly given from the founder\'s personal funds, at this stage we do not have a fixed grant size or a specific number of projects in mind. We are open to proposals of varying scopes and will evaluate each one on its own merits. It is safe to assume that we can choose between 0-1 projects each month and the grant will be enough to cover at least compute costs and some additional expenses.',
        },
    },
    {
        question: 'Why is the funding model this way?',
        answer: {
            type: 'text',
            content:
                'This is giving back to the society and fostering innovation in the field of computing and science, by supporting researchers and projects that may not receive funding through traditional channels due to various constraints.',
        },
    },
        {
        question: 'I want to give you funds to support this cause, how can I do that?',
        answer: {
            type: 'text',
            content:
                'We do not accept direct donations at this time. However, we appreciate your support and encourage you to fill the form under join us to become an external collaborator. We will redirect the projects which need funding and it\'s up to you to independently fund them.',
        },
    },
        {
        question: 'The FAQ only has answers for AI-related questions, what if I have a different project in mind?',
        answer: {
            type: 'text',
            content:
                'Our primary mission is to accelerate progress in AI and science. As a self-funded initiative, we must concentrate our resources on projects that align closely with these core areas to maximize our impact. We believe deeply in the value of interdisciplinary work and are open to reviewing innovative proposals from adjacent fields. However, please keep in mind that until we secure additional backing, our capacity to fund projects outside of computation and science will be limited. We encourage you to apply if you believe your work represents a fundamental breakthrough.',
        },
    }
];

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(2);
    const container = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray<FaqItemElement>(
            '.faq-item'
        ).forEach((item, index) => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            gsap.set(answer, { height: 'auto' });
            const tl = gsap
                .timeline({ paused: true })
                .fromTo(
                    answer,
                    { height: 0, opacity: 0, duration: 0.3, ease: 'power1.inOut' },
                    { height: 'auto', opacity: 1, duration: 0.3, ease: 'power1.inOut' }
                )
                .to(icon, { rotation: 45, duration: 0.3, ease: 'power1.inOut' }, 0);

            // Attach timeline to DOM node for later control
            item.animation = tl;

            if (activeIndex === index) {
                tl.play();
            }
        });
    }, { scope: container });


    const toggleFaq = (index: number) => {
        const newActiveIndex = activeIndex === index ? null : index;
        setActiveIndex(newActiveIndex);

        gsap.utils.toArray<FaqItemElement>(
            '.faq-item'
        ).forEach((item, i) => {
            if (i === newActiveIndex) {
                item.animation?.play();
            } else {
                item.animation?.reverse();
            }
        });
    };

    const renderBoldText = (text: string) => {
        const parts = text.split('**');
        return (
            <>
                {parts.map((part, i) =>
                    i % 2 === 1 ? (
                        <strong key={i} className="font-medium text-gray-900 text-lg">
                            {part}
                        </strong>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    const renderAnswer = (answer: Answer) => {
        switch (answer.type) {
            case 'text':
                return <p className="text-lg text-gray-700">{answer.content}</p>;
            case 'list':
                return (
                    <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
                        {answer.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                );
            case 'columns':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {answer.content.map((column, colIndex) => (
                            <div key={colIndex}>
                                <h3 className="font-heading font-semibold text-lg mb-3 text-gray-900">
                                    {column.title}
                                </h3>
                                <ul className="space-y-4 text-lg text-gray-700">
                                    {column.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{renderBoldText(item)}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="bg-[#F0ECE5] py-24 sm:py-32 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={container} className="space-y-6">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item bg-[#F0ECE5] border border-blue-200 rounded-lg shadow-sm overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-start text-left p-6 md:px-8 md:py-5"
                                aria-expanded={activeIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="block text-[20px] md:text-[22px] font-heading font-semibold text-gray-900 leading-snug">
                                    {faq.question}
                                </span>
                                <span className="faq-icon text-gray-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="transform"
                                    >
                                        <path
                                            d="M12 5V19"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5 12H19"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className="faq-answer overflow-hidden h-0 opacity-0"
                            >
                                <div className="px-6 pb-8 md:px-8 md:pb-6 text-base md:text-lg text-gray-700 leading-relaxed">
                                    {renderAnswer(faq.answer)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;