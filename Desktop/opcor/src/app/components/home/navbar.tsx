'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const navItems = [
    { name: 'Research', href: '/research' },
    { name: 'People', href: '/people' },
    { name: 'Join Us', href: '/joinus' },
    { name: 'About Us', href: '/aboutus' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0, y: -20, duration: 0.8, ease: 'power3.out',
      });
      gsap.from(menuItemsRef.current, {
        opacity: 0, y: -20, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center pt-4">

            <div ref={logoRef}>
              <Link href="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
                <div className="flex flex-col">
                  <h1 className="text-3xl font-black tracking-tighter text-black leading-none">
                    OPCOR<span className='text-[#FF007A]'>.</span><span className='text-[20px] text-neutral-600'> Labs</span>
                  </h1>
                </div>
              </Link>
            </div>

            <div className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    ref={(el) => { menuItemsRef.current[index] = el; }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm font-semibold text-black hover:text-[#FF007A] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 z-50 relative"
                aria-label="Toggle menu"
              >
                <div className="w-7 h-6 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-black transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[11px]' : ''}`} />
                  <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-full bg-black transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[11px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#E1DDF9] flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <ul className="text-center space-y-6">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Link
                href={item.href}
                onClick={closeMobileMenu}
                className="text-4xl text-black tracking-tighter"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;