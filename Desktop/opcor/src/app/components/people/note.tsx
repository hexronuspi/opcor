'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GlobeIcon, LinkedinIcon, TwitterIcon, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// ============================================
// EDITABLE DATA SECTION - EDIT YOUR TEAM HERE
// ============================================

interface FundedProject {
  title: string;
  url: string;
}

interface TeamMember {
  name: string;
  position: string; // e.g., "Head of AI", "Head of Tech", etc.
  image?: string;
  bio?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
  fundedProjects?: FundedProject[];
}

interface TeamSection {
  title: string; // e.g., "Founders", "Executives", "Directors", etc.
  members: TeamMember[];
  defaultExpanded?: boolean; // Whether this section is expanded by default
}

const TEAM_DATA: TeamSection[] = [
  {
    title: 'Founder',
    defaultExpanded: true,
    members: [
      {
        name: 'Aditya Raj',
        position: '',
        image: '/team/aditya_dp.jpg',
        bio: 'Aditya is a final-year UG student at NIT Patna with 4 years of coding experience and 3 years of AI research at IITs, IIITH and BITS Goa. He qualified Regional Mathematical Olympiad and National Standard Examination in Astronomy. This work has led to an invitation to the M2L Summer School in Croatia, and a role as an AI Researcher at a Finance Startup. Currently focused on AI Safety and Internal Representation  .',
        linkedin: 'https://www.linkedin.com/in/hexronus/',
        website: 'https://hexronuspi.github.io/',
        fundedProjects: []
      }
    ]
  },
  {
    title: 'Research Team',
    defaultExpanded: true,
    members: [
      // Research fellows and scientists will be added here
      // We unite exceptional innovators to advance computation and science
    ]
  },
  {
    title: 'Advisory Board',
    defaultExpanded: false,
    members: [
      // Advisors and mentors helping us set the standard that rivals the best labs worldwide
    ]
  }
];

// ============================================
// COMPONENT CODE - DO NOT EDIT BELOW THIS LINE
// ============================================

const PersonCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:border-[#6349E8]/30 flex flex-col h-full">
      {/* Image */}
      {member.image && (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={member.image}
            alt={`${member.name}'s Profile Picture`}
            className="rounded-full object-cover border-4 border-gray-200 shadow-md"
            fill
            sizes="128px"
          />
        </div>
      )}

      {/* Name */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
        {member.name}
      </h3>

      {/* Position */}
      <p className="text-sm font-semibold text-[#6349E8] text-center mb-4">
        {member.position}
      </p>

      {/* Social Links */}
      {(member.linkedin || member.website || member.twitter) && (
        <div className="flex items-center justify-center space-x-4 mb-4">
          {member.website && (
            <Link
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#6349E8] transition-colors duration-300"
              aria-label="Personal Website"
            >
              <GlobeIcon className="w-5 h-5" />
            </Link>
          )}
          {member.linkedin && (
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#6349E8] transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </Link>
          )}
          {member.twitter && (
            <Link
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#6349E8] transition-colors duration-300"
              aria-label="Twitter Profile"
            >
              <TwitterIcon className="w-5 h-5" />
            </Link>
          )}
        </div>
      )}

      {/* Bio */}
      {member.bio && (
        <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
          {member.bio}
        </p>
      )}

      {/* Funded Projects */}
      {member.fundedProjects && member.fundedProjects.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
            Funded Projects
          </h4>
          <ul className="space-y-2">
            {member.fundedProjects.map((project, idx) => (
              <li key={idx}>
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6349E8] hover:text-[#5239D8] transition-colors duration-200 flex items-center group"
                >
                  <span className="flex-grow">{project.title}</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const TeamSectionComponent = ({ section }: { section: TeamSection }) => {
  const [isExpanded, setIsExpanded] = useState(section.defaultExpanded ?? false);

  // Don't render if no members
  if (!section.members || section.members.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Section Header - Academic Style */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-4 group mb-6 hover:opacity-80 transition-opacity duration-200"
      >
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 whitespace-nowrap">
          {section.title}
        </h2>
        
        {/* Horizontal line */}
        <div className="flex-grow h-0.5 bg-[#6349E8]"></div>
        
        {/* Chevron indicator */}
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#6349E8]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#6349E8]" />
          )}
        </div>
      </button>

      {/* Members Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {section.members.map((member, idx) => (
            <PersonCard key={idx} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#F0ECE5] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Our Team
          </h1>
          <p className="text-lg text-gray-600">We have one goal - helping those who want to make a difference.</p>
        </div>

        {/* Team Sections */}
        {TEAM_DATA.map((section, idx) => (
          <TeamSectionComponent key={idx} section={section} />
        ))}

        {/* Fallback message if no team data */}
        {TEAM_DATA.every(section => !section.members || section.members.length === 0) && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              Team members will be added soon. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}