'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { name: 'Research', href: withBasePath('/research') },
    { name: 'People', href: withBasePath('/people') },
    { name: 'Publications', href: withBasePath('/publications') },
    { name: 'Teaching', href: withBasePath('/teaching') },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-background-light/95 dark:bg-background-dark/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href={withBasePath("/")} className="flex items-center gap-4 group" onClick={() => setIsOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-white dark:bg-primary dark:text-text-main group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-[24px]">bubble_chart</span>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight leading-none text-text-main dark:text-text-light">
                  Colorado AI Lab
                </h2>
                <p className="text-xs font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-wide">
                  University of Colorado Boulder
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-bold transition-colors hover:text-primary",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-text-main dark:text-text-light"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={withBasePath("/join-us")}
              className="hidden sm:flex h-10 items-center justify-center rounded bg-black dark:bg-primary px-6 text-sm font-bold text-white dark:text-text-main hover:bg-gray-800 dark:hover:bg-primary-hover transition-all shadow-md hover:shadow-lg"
            >
              Join Us
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-text-main dark:text-text-light hover:text-primary transition-colors z-[60]"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-3xl font-bold">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Reimplemented for full coverage and contrast */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-[55] lg:hidden bg-white flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-4 sm:right-6 p-2 text-black hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-3xl font-bold">close</span>
            </button>
            
            <nav className="flex flex-col gap-6 items-center w-full mt-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-3xl font-black uppercase tracking-tight py-4 transition-colors",
                      pathname === item.href 
                        ? "text-primary" 
                        : "text-black hover:text-primary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="w-24 h-1 bg-gray-100 my-4 rounded-full" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-[280px]"
              >
                <Link
                  href={withBasePath("/join-us")}
                  className="flex items-center justify-center h-14 rounded-full bg-black text-white text-lg font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-transform"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pt-8 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                University of Colorado Boulder
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
