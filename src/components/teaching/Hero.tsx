import React from 'react';
import { withBasePath } from '@/lib/paths';

interface HeroProps {
  data: {
    title: string;
    subtitle: string;
    button_text: string;
    image_url: string;
  };
}

export function Hero({ data }: HeroProps) {
  // Process title for bolding "Intelligence"
  const titleParts = data.title.split('**');
  
  return (
    <section className="relative px-4 md:px-10 py-8 md:py-12 bg-white dark:bg-background-dark">
      <div 
        className="max-w-[1280px] mx-auto bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden relative min-h-[480px] flex items-center justify-center p-8"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("${withBasePath(data.image_url)}")` }}
      >
        <div className="text-center max-w-3xl z-10 flex flex-col gap-6 items-center">
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
            {titleParts[0]}
            <span className="text-primary">{titleParts[1]}</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            {data.subtitle}
          </p>
          <button className="mt-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-text-main text-base font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(249,245,6,0.4)]">
            {data.button_text}
          </button>
        </div>
      </div>
    </section>
  );
}
