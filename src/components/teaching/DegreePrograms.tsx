import { withBasePath } from '@/lib/paths';
import React from 'react';

interface DegreeProgramsProps {
  programs: {
    title: string;
    description: string;
    type: 'light' | 'dark';
    icon: string;
    features?: string[];
    link_text?: string;
    link_url?: string;
    slug?: string; // Add slug as we might prefer to construct link from slug
  }[];
}

export function DegreePrograms({ programs }: DegreeProgramsProps) {
  return (
    <section className="px-4 md:px-10 py-12 bg-[#f8f8f5] dark:bg-background-dark/50">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-10 border-l-4 border-primary pl-4">Degree Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, idx) => {
             const features = program.features || [];
             const linkUrl = program.link_url || (program.slug ? `/teaching/${program.slug}` : '#');
             const linkText = program.link_text || "Learn More";
             
             return (
            <div 
              key={idx}
              className="group rounded-[2rem] p-8 border border-[#e6e6db] bg-white text-text-main shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col gap-4 hover:border-primary"
            >
              
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors bg-[#f5f5f0] text-primary group-hover:bg-primary group-hover:text-text-main"
              >
                <span className="material-symbols-outlined">{program.icon}</span>
              </div>

              <h3 className="text-xl font-bold text-text-main">
                {program.title}
              </h3>
              
              <p className="text-sm leading-relaxed mb-4 text-text-main/80">
                {program.description}
              </p>

              <ul className="flex flex-col gap-2 mb-4">
                {features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={withBasePath(linkUrl)} 
                className="mt-auto text-sm font-bold border-b-2 border-primary w-max pb-0.5 hover:text-primary transition-colors text-text-main"
              >
                {linkText} →
              </a>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}

