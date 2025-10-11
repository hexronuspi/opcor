'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JoinUsHero = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!componentRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      
      gsap.from('.gsap-fade-in', { 
        opacity: 0, 
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={componentRef} 
      className="relative w-full min-h-screen bg-[#F0EEE9] overflow-hidden flex items-center py-[4rem] md:py-[4rem] px-4 sm:px-6 lg:px-8"
    >
      {/* Purple Polygon Background */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#d9d3ff] to-[#C0B7F8]"
        style={{ clipPath: 'polygon(0 0, 90% 0, 12% 38%, 0% 20%)' }}
      ></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Header - Left Aligned */}
        <div className="gsap-fade-in mb-4">
          <div className="max-w-4xl space-y-3 text-gray-700 leading-relaxed">
            <p className="text-base md:text-lg">
              We believe collaboration is the key to everything. Sharing knowledge is the most effective way to grow together, 
              and advancing the frontiers of AI and science is not possible alone.
            </p>
            <p className="text-base md:text-lg">
              Our mission is to establish a globally unparalleled research hub, uniting exceptional innovators to advance 
              foundational work in AI and science. We evaluate talent based on the collective body of your work, not just your resume.
            </p>
          </div>
        </div>

        {/* Two Column Section with Vertical Divider */}
        <div className="gsap-fade-in bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/60 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x divide-gray-300">
            
            {/* Grant Making Section */}
            <div className="p-6 md:p-8">
              <div className="mb-5">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                  Grant Making
                </h2>
                <div className="w-12 h-0.5 bg-[#6349E8]"></div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  We support exceptional researchers working on foundational problems in AI, computation, and science. 
                  Our grants enable innovative work that drives real-world impact and sets new standards in the field.
                </p>
                
                <div className="bg-amber-50/80 border-l-3 border-l-4 border-amber-500 p-4 rounded-r">
                  <p className="text-xs md:text-sm text-gray-800 leading-relaxed">
                    <span className="font-semibold">Status:</span> We are still in progress. We will open grant applications by{' '}
                    <span className="font-bold text-gray-900">1st January, 2026</span>.
                  </p>
                </div>

                {/* Disabled Button */}
                <button
                  disabled
                  className="w-full sm:w-auto px-6 py-2.5 text-sm md:text-base bg-gray-300 text-gray-500 rounded font-medium cursor-not-allowed opacity-60"
                >
                  Application Opens January 1st, 2026
                </button>
              </div>
            </div>

            {/* External Collaboration Section */}
            <div className="p-6 md:p-8">
              <div className="mb-5">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                  External Independent Collaboration
                </h2>
                <div className="w-12 h-0.5 bg-[#6349E8]"></div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  We appreciate your support and encourage you to become an external collaborator. 
                  We will redirect projects that need funding, and you can independently choose to fund them based on merit and alignment with your vision.
                </p>
                
                <div className="bg-blue-50/80 border-l-4 border-blue-500 p-4 rounded-r">
                  <p className="text-xs md:text-sm text-gray-800 leading-relaxed">
                    Fill the form below to register as an external collaborator. 
                    Together, we can support transformative research and build the future of AI.
                  </p>
                </div>

                {/* Active Button */}
                <Link 
                  href="#form"
                  className="inline-block w-full sm:w-auto text-center px-6 py-2.5 text-sm md:text-base bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors duration-300"
                >
                  Fill the Form
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Section */}
        <div className="gsap-fade-in pt-6 border-t border-gray-300/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Mail className="w-4 h-4 text-[#6349E8] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs md:text-sm text-gray-700">
              Have questions? Reach out to us at{' '}
              <a 
                href="mailto:hexronus@gmail.com" 
                className="text-[#6349E8] hover:text-[#5239D8] font-semibold underline decoration-2 underline-offset-2 transition-colors"
              >
                hexronus@gmail.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default JoinUsHero;
