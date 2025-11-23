"use client";

import React from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
} from 'framer-motion';
import { 
  ArrowRight, 
  Cpu, 
  Zap, 
  Code2, 
  Asterisk, 
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.035] mix-blend-multiply">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const RegularButton = ({ 
  children, 
  className, 
  variant = 'primary' 
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'primary' | 'secondary' 
}) => {
  const baseStyles = "relative group overflow-hidden rounded-full px-8 py-4 text-base font-semibold tracking-tight transition-all duration-300 border";
  
  const variants = {
    primary: "bg-black text-[#F0EEE9] border-black hover:bg-neutral-800",
    secondary: "bg-transparent text-black border-black/10 hover:border-black/30 hover:bg-black/5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
};

const FeatureCard = ({ title, icon: Icon, children, index }: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between p-10 bg-white border border-black/5 hover:border-purple-500/30 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 aspect-[4/5] md:aspect-auto"
    >
      <div>
        <div className="mb-8 flex items-center justify-between">
            <div className="p-3 bg-[#F0EEE9] rounded-lg text-black group-hover:text-purple-600 transition-colors">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <span className="font-mono text-xs text-neutral-400">0{index + 1}</span>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-black tracking-tight group-hover:text-purple-700 transition-colors">{title}</h3>
        <p className="text-neutral-600 leading-relaxed font-medium">{children}</p>
      </div>
      
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="z-10 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-2 order-1 lg:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.85] font-bold tracking-tighter text-black mb-8">
                        MERIT <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black italic font-serif">OVER</span> CREDENTIALS
                    </h1>
                </motion.div>
            </div>

            <div className="lg:col-span-1 order-2 lg:order-2 lg:pt-8">
                <motion.p 
                    initial={{ opacity: 0 }}    
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg leading-relaxed text-neutral-600 font-medium mb-8"
                >
                    We believe that the greatest tragedy in science isn&apos;t that ideas fail, but that they never get the chance to live. We are here to ensure your curiosity isn&apos;t killed by a lack of resources. If you have the vision, let&apos;s make it a reality.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-row gap-4"
                >
                <Link href="/joinus">
                    <RegularButton variant="primary">
                        Grant <ArrowRight size={18} />
                    </RegularButton>
                </Link>
                <Link href="/research">
                    <RegularButton variant="secondary">
                    Open Source
                    </RegularButton>
                </Link>
                </motion.div>
            </div>
        </div>
      </div>

      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-20 left-6 md:left-12 flex items-center gap-4 text-neutral-400"
      >
        <Asterisk className="animate-spin-slow" />
        <span className="text-xs font-mono uppercase tracking-widest">Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section className="relative py-40 px-6 border-t border-black/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
                <div className="sticky top-40">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6">
                        The Philosophy
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">
                        Code over<br />Citations.
                    </h2>
                </div>
            </div>
            
            <div className="md:w-2/3">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <p className="text-3xl md:text-4xl leading-tight font-medium text-neutral-800">
                        We do not evaluate talent by academic transcripts, but by the rigor of your work, the depth of your inquiry, and the tangibility of your results.
                    </p>
                    
                    <div className="h-px w-full bg-black/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"/> The Problem
                            </h4>
                            <p className="text-neutral-600">
                              Traditional funding requires lengthy proposals, committees, and credentials—creating artificial scarcity where brilliant minds compete for limited opportunities instead of building breakthroughs.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"/> The Solution
                            </h4>
                            <p className="text-neutral-600">
                              High-velocity grants for outliers. If you are working on &quot;crazy&quot; ideas on nights and weekends—whether it&apos;s a breakthrough algorithm, novel research, or paradigm-shifting experiment, we will provide you with more fuel.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

const OperatingSystem = () => {
  return (
    <section className="py-32 px-6 bg-[#EAE8E2]">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-black/10">
          <FeatureCard title="Fast Grants" icon={Zap} index={0}>
            No 30-page proposals. Apply with a clear hypothesis. Decisions made in days. Velocity is our currency.
          </FeatureCard>
          
          <FeatureCard title="Radical Openness" icon={Code2} index={1}>
            We are an open institute. All findings funded by OPCOR must be open-sourced (MIT/Apache 2.0).
          </FeatureCard>
          
          <FeatureCard title="Compute" icon={Cpu} index={2}>
            Money is just the start. We provide access to massive compute resources to accelerate your models.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};


export default function OpcorLanding() {
  return (
    <div className="bg-[#F0EEE9] min-h-screen text-black selection:bg-purple-500 selection:text-white overflow-x-hidden font-sans">
      <NoiseOverlay />
      
      <main>
        <Hero />
        <Manifesto />
        <OperatingSystem />
      </main>
    </div>
  );
}