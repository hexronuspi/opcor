'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Cpu, Bot, Brain, Shield, Lock } from 'lucide-react';
import { TbEngine } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const researchData = [
  {
    id: '01',
    title: 'Robotics',
    category: 'EMBODIED AI',
    icon: Bot,
    short: 'Bridging the gap between simulation and reality. We fund research into general-purpose manipulation, quadrupedal locomotion, and end-to-end visuomotor control policies.',
  },
  {
    id: '02',
    title: 'Mechanical',
    category: 'KINEMATICS',
    icon: Cpu,
    short: 'Reimagining actuation. High-torque density motors, soft robotics, and bio-mimetic structures that allow machines to interact safely and fluidly with the physical world.',
  },
  {
    id: '03',
    title: 'Intelligence',
    category: 'COGNITION',
    icon: Brain,
    short: 'Beyond pattern matching. Exploring neuro-symbolic architectures and reasoning frameworks to assess whether models truly understand the world or merely mimic it.',
  },
  {
    id: '04',
    title: 'Safety',
    category: 'ALIGNMENT',
    icon: Shield,
    short: 'Formal verification and interpretability. We treat safety as an engineering constraint, not an afterthought. How do we mathematically guarantee system behavior?',
  },
  {
    id: '05',
    title: 'Attacks',
    category: 'ADVERSARIAL',
    icon: Lock,
    short: 'Red-teaming the future. Researching universal defense mechanisms against prompt injection, model poisoning, and extraction attacks in open-weight systems.',
  },
  {
    id: '06',
    title: 'Engineering',
    category: 'DISCOVERY',
    icon: TbEngine,
    short: 'AI for Engineering. Accelerating physics simulations and related concepts. Using compute to solve hard scientific problems.',
  },
];

const GridCrosshair = () => (
  <div className="absolute -top-3 -left-3 w-6 h-6 flex items-center justify-center z-20 pointer-events-none text-black/20">
    <Plus strokeWidth={1} size={16} />
  </div>
);

const ResearchNode = ({ item }: { item: typeof researchData[0] }) => {
  const Icon = item.icon;

  return (
    <div className="gsap-node group relative min-h-[320px] flex flex-col justify-between p-8 border-l border-t border-black/10 transition-colors duration-500 hover:bg-[#0a0a0a] hover:border-transparent">
      
      <GridCrosshair />

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500 group-hover:text-purple-400 transition-colors">
            {item.id} {item.category}
            </span>
            <Icon size={24} strokeWidth={1} className="mt-2 text-black group-hover:text-white transition-colors duration-500" />
        </div>
        
      </div>

      <div className="relative z-10 mt-12">
        <h3 className="text-3xl font-medium tracking-tight mb-4 text-[#1a1a1a] group-hover:text-white transition-colors duration-300">
          {item.title}
        </h3>
        <p className="font-mono text-xs md:text-sm text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors duration-300 max-w-sm">
          {item.short}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-600 group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  );
};

const ResearchHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
        }
      });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      tl.from(".gsap-node", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          grid: [2, 3],
          from: "start"
        },
        ease: "expo.out"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#F0EEE9] text-[#1a1a1a] py-24 md:py-32 overflow-hidden selection:bg-purple-500 selection:text-white"
    >
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>
      
      <div className="absolute top-20 right-0 pointer-events-none opacity-[0.03] select-none">
        <span className="text-[20vw] leading-none font-bold tracking-tighter">AREAS</span>
      </div>


      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"/>
                <span className="font-mono text-xs uppercase tracking-widest font-semibold text-black/60">Research Vectors</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-6">
              Frontiers of <br />
              <span className="text-purple-700 italic font-serif">Applied</span> Intelligence.
            </h1>
          </div>
          
          <div className="max-w-md font-mono text-xs md:text-sm text-gray-600 leading-relaxed border-l-2 border-purple-600 pl-6">
            <p>
              Traditional academia rewards the cautious. We fund the reckless. 
              Deploying capital into high-entropy research domains: Engineering and AI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-r border-b border-black/10">
          {researchData.map((item, index) => (
            <ResearchNode key={index} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResearchHero;