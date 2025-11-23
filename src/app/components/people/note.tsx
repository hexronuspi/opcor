'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GlobeIcon, LinkedinIcon, TwitterIcon, ArrowUpRight, Plus, Minus, type LucideProps } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FundedProject {
  title: string;
  url: string;
}

interface TeamMember {
  name: string;
  position: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
  fundedProjects?: FundedProject[];
}

interface TeamSection {
  title: string;
  members: TeamMember[];
  defaultExpanded?: boolean;
}

const TEAM_DATA: TeamSection[] = [
  {
    title: 'Founder',
    defaultExpanded: true,
    members: [
      {
        name: 'Aditya Raj',
        position: 'Founder',
        image: '/team/aditya_dp.jpg',
        bio: 'I established OPCOR on a fundamental conviction: that the friction between a radical idea and its realization must be eliminated. Our mandate is to underwrite the material costs of exploration so that the inventor is free to focus solely on the invention. We are cultivating a high-velocity ecosystem—a crucible where intellectual property is not hoarded in silos, but collided in the open. We operate under the belief that the intractable problems of AI and engineering will no longer yield to the solitary genius. Instead, they demand a collective nervous system of builders, thinkers, and outliers, all working in absolute concert.',
        linkedin: 'https://www.linkedin.com/in/hexronus/',
        website: 'https://hexronuspi.github.io/',
        fundedProjects: []
      }
    ]
  },
  {
    title: 'Research Patron',
    defaultExpanded: false,
    members: [
    ]
  },
  {
    title: 'Advisory Board',
    defaultExpanded: false,
    members: [
    ]
  }
];

const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ComponentType<LucideProps> }) => (
  <Link
    href={href}
    target="_blank"
    className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
  >
    <Icon size={14} strokeWidth={1.5} />
  </Link>
);

const PersonCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="group relative bg-white border border-black/5 hover:border-black/20 transition-all duration-500 overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-start p-6 border-b border-black/5 bg-[#FAFAFA]">
        <div className="font-mono text-xs uppercase tracking-widest text-gray-500 pt-1">
          {member.position || "MEMBER"}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
          {member.website && <SocialLink href={member.website} icon={GlobeIcon} />}
          {member.linkedin && <SocialLink href={member.linkedin} icon={LinkedinIcon} />}
          {member.twitter && <SocialLink href={member.twitter} icon={TwitterIcon} />}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden bg-gray-100 border border-black/10">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 font-mono text-xs">
                NO_IMG
              </div>
            )}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/30" />
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-2xl font-serif italic mb-4 text-black group-hover:text-[#6349E8] transition-colors duration-300">
            {member.name}
          </h3>
          
          {member.bio && (
            <p className="text-sm text-gray-600 leading-[1.8] font-light max-w-2xl border-l border-black/10 pl-4 mb-6">
              {member.bio}
            </p>
          )}

          {member.fundedProjects && member.fundedProjects.length > 0 && (
            <div className="mt-4 pt-4 border-t border-dashed border-black/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">
                Deployment History
              </span>
              <ul className="flex flex-wrap gap-3">
                {member.fundedProjects.map((project, idx) => (
                  <li key={idx}>
                    <Link
                      href={project.url}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-[#6349E8] border-b border-black/20 hover:border-[#6349E8] transition-all pb-0.5"
                    >
                      {project.title}
                      <ArrowUpRight size={10} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

const SectionHeader = ({ title, isOpen, toggle }: { title: string, isOpen: boolean, toggle: () => void }) => (
  <button 
    onClick={toggle}
    className="w-full flex items-center justify-between py-6 border-b border-black group transition-colors duration-300"
  >
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#6349E8]' : 'bg-black'}`} />
      <h2 className="text-xl md:text-3xl font-light tracking-tight text-black group-hover:pl-4 transition-all duration-300">
        {title}
      </h2>
    </div>
    <div className="border border-black/10 rounded-full p-2 group-hover:bg-black group-hover:text-white transition-all">
      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
    </div>
  </button>
);

const EmptyState = () => (
  <div className="py-12 px-6 border border-dashed border-black/20 bg-gray-50/50 flex flex-col items-center justify-center text-center">
    <p className="text-gray-500 font-light italic">
      Position currently vacant. We are scouting for outliers.
    </p>
  </div>
);

export default function TeamPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TEAM_DATA.forEach(section => {
      initial[section.title] = section.defaultExpanded ?? false;
    });
    return initial;
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen bg-[#F0EEE9] text-[#1a1a1a] selection:bg-[#6349E8] selection:text-white font-sans">
      
      <header className="pt-24 pb-16 px-6 max-w-7xl mx-auto border-b border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Our <span className="text-[#8B5CF6] font-serif italic">Members.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm md:text-base text-gray-600 leading-relaxed font-light border-l border-black pl-6">
            We are a collective of researchers and engineers united by a single mission: 
            <span className="font-medium text-black block mt-2">To bypass the noise and work on ideas.</span>
          </p>
        </div>
      </header>

      <main className="px-6 max-w-7xl mx-auto py-12">
        {TEAM_DATA.map((section, idx) => (
          <div key={idx} className="mb-8">
            <SectionHeader 
              title={section.title} 
              isOpen={expandedSections[section.title]} 
              toggle={() => toggleSection(section.title)} 
            />
            
            <AnimatePresence>
              {expandedSections[section.title] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 pb-12 grid grid-cols-1 gap-6">
                    {section.members && section.members.length > 0 ? (
                      section.members.map((member, mIdx) => (
                        <PersonCard key={mIdx} member={member} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </main>

    </div>
  );
}