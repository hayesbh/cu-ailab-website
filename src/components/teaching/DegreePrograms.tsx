import React from 'react';

interface DegreeProgramsProps {
  programs: {
    title: string;
    description: string;
    type: 'light' | 'dark';
    icon: string;
    features: string[];
    link_text: string;
    link_url: string;
  }[];
}

export function DegreePrograms({ programs }: DegreeProgramsProps) {
  return (
    <section className="px-4 md:px-10 py-12 bg-[#f8f8f5] dark:bg-background-dark/50">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-10 border-l-4 border-primary pl-4">Degree Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, idx) => (
            <div 
              key={idx}
              className={`group rounded-[2rem] p-8 border flex flex-col gap-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden
                ${program.type === 'dark' 
                  ? 'bg-background-dark text-white border-background-dark' 
                  : 'bg-white dark:bg-background-dark border-[#e6e6db] dark:border-white/10 hover:border-primary'
                }`}
            >
              {program.type === 'dark' && (
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              )}
              
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
                   ${program.type === 'dark' 
                      ? 'bg-white/10 text-primary' 
                      : 'bg-[#f5f5f0] dark:bg-white/10 text-primary group-hover:bg-primary group-hover:text-text-main'
                   }`}
              >
                <span className="material-symbols-outlined">{program.icon}</span>
              </div>

              <h3 className={`text-xl font-bold ${program.type === 'dark' ? 'text-white' : 'text-text-main dark:text-white'}`}>
                {program.title}
              </h3>
              
              <p className={`text-sm leading-relaxed mb-4 ${program.type === 'dark' ? 'text-gray-300' : 'text-text-main/80 dark:text-gray-300'}`}>
                {program.description}
              </p>

              <ul className="flex flex-col gap-2 mb-4">
                {program.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-center gap-2 text-sm ${program.type === 'dark' ? 'text-gray-400' : 'text-text-light dark:text-gray-400'}`}>
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={program.link_url} 
                className={`mt-auto text-sm font-bold border-b-2 border-primary w-max pb-0.5 hover:text-primary transition-colors
                  ${program.type === 'dark' ? 'text-white' : 'text-text-main dark:text-white'}`}
              >
                {program.link_text} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
