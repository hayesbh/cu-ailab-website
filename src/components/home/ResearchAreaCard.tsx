'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { withBasePath } from '@/lib/paths';

export interface ResearchArea {
  title: string;
  description: string;
  image: string;
  icon: string;
  link: string;
}

interface ResearchAreaCardProps {
  item: ResearchArea;
  index: number;
}

export function ResearchAreaCard({ item, index }: ResearchAreaCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-[85vw] md:min-w-[400px] lg:min-w-[500px] snap-center"
    >
      <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-black">
        <img
          src={withBasePath(item.image)}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-primary text-black">
            <span className="material-symbols-outlined">{item.icon}</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-200 mb-6 line-clamp-3">
            {item.description}
          </p>
          <Link href={item.link} className="inline-flex items-center text-primary font-bold group-hover:underline underline-offset-4">
            View Projects <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
