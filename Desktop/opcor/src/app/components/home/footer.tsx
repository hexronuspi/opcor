'use client';

import { Globe } from 'lucide-react';
import Link from 'next/link';
import {FiMail } from 'react-icons/fi';

// A decorative SVG component to mimic the curves from the HAI example
const FooterGraphic = () => (
  <svg
    width="200"
    height="100%"
    viewBox="0 0 200 350"
    preserveAspectRatio="none"
    className="absolute top-0 right-0 h-full z-0"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8A2BE2', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FF007A', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#50E3C2', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M 150 0 C 50 100, 250 200, 150 350"
      stroke="url(#grad1)"
      strokeWidth="20"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 170 0 C 70 100, 270 200, 170 350"
      stroke="url(#grad2)"
      strokeWidth="20"
      fill="none"
      strokeLinecap="round"
    />
     <path
      d="M 190 0 C 90 100, 290 200, 190 350"
      stroke="url(#grad1)"
      strokeWidth="20"
      fill="none"
      strokeLinecap="round"
      style={{opacity: 0.6}}
    />
  </svg>
);

const Footer = () => (
  <footer className="bg-[#F0EEE9] py-[6.3rem] px-4 sm:px-6 lg:px-8">
    <div className="relative max-w-7xl mx-auto bg-white text-black rounded-2xl shadow-lg overflow-hidden">
      <div className="relative z-10 p-8 sm:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-neutral-200">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <h1 className="text-4xl font-black tracking-tighter text-black leading-none">
                OPCOR<span className="text-[#FF007A]">.</span>
                <span className="text-2xl text-neutral-500 font-medium"> Labs</span>
              </h1>
            </Link>
            <p className="mt-3 text-sm text-neutral-600 max-w-4xl">
              We are a computational intelligence research lab working towards solving some of the foundational problems in AI and Science.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="mailto:hexronus@gmail.com" aria-label="Email" className="p-3 border-2 border-neutral-300 rounded-full text-neutral-600 hover:text-black hover:border-black transition-colors duration-300">
              <FiMail className="h-5 w-5" />
            </Link>
            <Link href="https://hexronuspi.github.io/" aria-label="Email" className="p-3 border-2 border-neutral-300 rounded-full text-neutral-600 hover:text-black hover:border-black transition-colors duration-300">
              <Globe className="h-5 w-5" />
            </Link>

          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-500">Navigate</h3>
            <ul className="space-y-3">
              <li><Link href="/research" className="text-lg hover:text-[#FF007A] transition-colors">Research</Link></li>
              <li><Link href="/joinus" className="text-lg hover:text-[#FF007A] transition-colors">Join Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 text-center sm:text-left sm:flex sm:justify-between">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} OPCOR. Labs
            </p>
        </div>

      </div>
      <FooterGraphic />
    </div>
  </footer>
);

export default Footer;