'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

import { ThreeGraph } from './ThreeGraph';

interface HeroProps {
  data: {
    title: string;
    subtitle: string;
    new_label: string;
    cta_primary: string;
    cta_secondary: string;
    background_image: string;
  };
  ticker_items: string[];
}

export function Hero({ data, ticker_items }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-background-dark text-white pt-24 pb-32 lg:pt-32 lg:pb-40 min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <ThreeGraph />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary font-bold">New:</span> {data.new_label.replace('New: ', '')}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            {data.title.split(' ')[0]} <span className="text-primary">{data.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 max-w-2xl leading-relaxed mb-10 font-light"
          >
            {data.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="h-12 px-8 rounded bg-primary text-black font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg">
              {data.cta_primary}
            </button>
            <Link href="/people" className="flex items-center justify-center h-12 px-8 rounded border-2 border-white bg-transparent font-bold text-lg hover:bg-white hover:text-black transition-colors">
              {data.cta_secondary}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/50 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-4">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex min-w-full shrink-0 items-center">
            {/* Slide 1 */}
            <div className="flex items-center gap-12 pr-12">
              {ticker_items.map((item, i) => (
                <span key={i} className="flex items-center gap-12 text-sm font-mono text-primary uppercase tracking-widest">
                  {item} <span className="text-white/50">•</span>
                </span>
              ))}
            </div>
            {/* Slide 2 (Duplicate for loop) */}
            <div className="flex items-center gap-12 pr-12">
              {ticker_items.map((item, i) => (
                <span key={`dup-${i}`} className="flex items-center gap-12 text-sm font-mono text-primary uppercase tracking-widest">
                  {item} <span className="text-white/50">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles for ticker animation - usually in globals.css but adding here for now via style tag if needed or assume it's in global */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
