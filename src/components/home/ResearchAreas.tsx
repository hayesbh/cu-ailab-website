'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { withBasePath } from '@/lib/paths';
import { ResearchAreaCard, ResearchArea } from './ResearchAreaCard';

interface ResearchAreasProps {
  data: {
    title: string;
    subtitle: string;
    items: ResearchArea[];
  }
}

export function ResearchAreas({ data }: ResearchAreasProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.snap-center')?.clientWidth || 400;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-black dark:text-white">{data.title}</h2>
          <p className="text-lg text-text-muted dark:text-text-muted-dark max-w-2xl">
            {data.subtitle}
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full border border-border-light dark:border-border-dark hover:bg-background-alt dark:hover:bg-card-dark transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full border border-border-light dark:border-border-dark hover:bg-background-alt dark:hover:bg-card-dark transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="relative w-full">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 no-scrollbar snap-x snap-mandatory"
        >
          {data.items.map((item, index) => (
            <ResearchAreaCard key={index} item={item} index={index} />
          ))}

           <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[500px] snap-center">
             <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-black">
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                 <span className="material-symbols-outlined text-6xl text-white/20">more_horiz</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-8">
                 <h3 className="text-3xl font-bold text-white mb-2">More Areas</h3>
                 <p className="text-gray-200 mb-6">
                   Explore our work in machine learning theory, AI for science, and human-computer interaction.
                 </p>
                 <Link href={withBasePath("/research")} className="inline-flex items-center text-primary font-bold group-hover:underline underline-offset-4">
                   View All Areas <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                 </Link>
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
}
