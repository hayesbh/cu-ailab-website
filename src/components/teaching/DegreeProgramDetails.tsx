'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { withBasePath } from '@/lib/paths';
import { DegreeProgramFrontmatter } from '@/lib/degreeProgramUtils';

interface DegreeProgramDetailsProps {
  frontmatter: DegreeProgramFrontmatter;
  content: string;
}

export function DegreeProgramDetails({ frontmatter, content }: DegreeProgramDetailsProps) {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Refs for sections
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top/middle
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['overview', 'curriculum', 'requirements', 'timeline'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
        // Offset for sticky header/tabs
        const y = element.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'curriculum', label: 'Curriculum', show: !!frontmatter.curriculum },
    { id: 'requirements', label: 'Requirements', show: !!frontmatter.requirements },
    { id: 'timeline', label: 'Timeline', show: !!frontmatter.timeline },
  ];

  return (
    <div className="flex flex-1 justify-center py-8 px-4 md:px-10 lg:px-40">
      <div className="flex flex-col max-w-[1200px] flex-1 w-full">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 pb-6 text-sm">
          <a href={withBasePath("/")} className="text-[#897c61] hover:text-primary transition-colors font-medium leading-normal">Home</a>
          <span className="text-[#897c61] font-medium leading-normal">/</span>
          <a href={withBasePath("/teaching")} className="text-[#897c61] hover:text-primary transition-colors font-medium leading-normal">Academics</a>
          <span className="text-[#897c61] font-medium leading-normal">/</span>
          <span className="text-[#181611] dark:text-white font-semibold leading-normal">{frontmatter.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Main Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Sticky Tabs */}
            <div className="sticky top-[73px] z-40 bg-background-light dark:bg-background-dark pt-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex border-b border-[#e6e2db] dark:border-[#333] gap-6 md:gap-8 overflow-x-auto no-scrollbar">
                {tabs.filter(t => t.show).map((tab) => (
                    <a 
                        key={tab.id}
                        href={`#${tab.id}`}
                        onClick={(e) => scrollToSection(e, tab.id)}
                        className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-2 min-w-fit transition-colors cursor-pointer
                            ${activeSection === tab.id 
                                ? 'border-primary text-[#181611] dark:text-white' 
                                : 'border-b-transparent text-[#897c61] hover:text-primary'
                            }`}
                    >
                        <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
                    </a>
                ))}
              </div>
            </div>

            {/* Section: Overview */}
            <section id="overview" className="flex flex-col gap-4 scroll-mt-36">
              <h3 className="text-[#181611] dark:text-white text-2xl md:text-[28px] font-bold leading-tight">Program Overview</h3>
              <div className="text-[#181611] dark:text-gray-300 text-base leading-relaxed space-y-4 prose dark:prose-invert max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </section>

            {/* Section: Curriculum */}
            {frontmatter.curriculum && (
              <section id="curriculum" className="flex flex-col gap-6 pt-6 scroll-mt-36">
                <h3 className="text-[#181611] dark:text-white text-2xl md:text-[28px] font-bold leading-tight">Core & Elective Courses</h3>
                <div className="flex flex-col gap-4">
                  <h4 className="text-lg font-semibold text-[#897c61] uppercase tracking-wide">Core Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {frontmatter.curriculum.core.map((course, idx) => (
                      <div key={idx} className="group bg-white dark:bg-[#2a2a2a] p-5 rounded-lg border border-[#e6e2db] dark:border-[#444] hover:border-primary dark:hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{course.code}</span>
                          <span className="material-symbols-outlined text-[#897c61] group-hover:text-primary text-xl">arrow_forward</span>
                        </div>
                        <h5 className="text-lg font-bold text-[#181611] dark:text-white mb-1">{course.title}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {frontmatter.curriculum.electives && (
                  <div className="flex flex-col gap-4 mt-4">
                    <h4 className="text-lg font-semibold text-[#897c61] uppercase tracking-wide">Popular Electives</h4>
                    <ul className="list-disc list-inside space-y-2 text-[#181611] dark:text-gray-300">
                       {frontmatter.curriculum.electives.map((elective, idx) => (
                          <li key={idx}><strong>{elective.code}:</strong> {elective.title}</li>
                       ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Section: Requirements */}
            {frontmatter.requirements && (
              <section id="requirements" className="flex flex-col gap-6 pt-6 scroll-mt-36">
                <h3 className="text-[#181611] dark:text-white text-2xl md:text-[28px] font-bold leading-tight">Degree Requirements</h3>
                <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-6 border border-[#e6e2db] dark:border-[#444]">
                  <div className="space-y-6">
                    {frontmatter.requirements.map((req, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <div className="w-full h-px bg-[#e6e2db] dark:bg-[#444]"></div>}
                        <div className="flex gap-4 items-start">
                          <div className="min-w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{idx + 1}</div>
                          <div>
                             <h5 className="text-lg font-bold text-[#181611] dark:text-white">{req.title}</h5>
                             <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{req.description}</p>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section: Timeline */}
            {frontmatter.timeline && (
              <section id="timeline" className="flex flex-col gap-6 pt-6 pb-20 scroll-mt-36">
                <h3 className="text-[#181611] dark:text-white text-2xl md:text-[28px] font-bold leading-tight">Sample Timeline</h3>
                <div className="relative pl-4 border-l-2 border-[#e6e2db] dark:border-[#444] space-y-10 ml-3">
                  {frontmatter.timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className={`absolute -left-[23px] top-1 h-4 w-4 rounded-full ${idx === 0 ? 'bg-primary border-4 border-white dark:border-[#2a2a2a]' : 'bg-background-light dark:bg-background-dark border-2 border-primary'}`}></div>
                      <h5 className="text-lg font-bold text-[#181611] dark:text-white">{item.title}</h5>
                      {item.subtitle && <p className="text-sm text-[#897c61] font-medium mb-2">{item.subtitle}</p>}
                      <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                         {item.items.map((subItem, si) => (
                           <li key={si}>{subItem}</li>
                         ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 flex flex-col gap-6">
              
              {/* Quick Facts Card */}
              {frontmatter.quick_facts && (
                <div className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg border-t-4 border-primary p-6">
                  <h4 className="text-xl font-bold text-[#181611] dark:text-white mb-6">At a Glance</h4>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#f4f3f0] dark:bg-[#333] flex items-center justify-center text-[#897c61] dark:text-primary">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#897c61] uppercase tracking-wide">Duration</p>
                        <p className="text-[#181611] dark:text-white font-bold">{frontmatter.quick_facts.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-[#f4f3f0] dark:bg-[#333] flex items-center justify-center text-[#897c61] dark:text-primary">
                         <span className="material-symbols-outlined">menu_book</span>
                       </div>
                       <div>
                         <p className="text-xs font-semibold text-[#897c61] uppercase tracking-wide">Credits</p>
                         <p className="text-[#181611] dark:text-white font-bold">{frontmatter.quick_facts.credits}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-[#f4f3f0] dark:bg-[#333] flex items-center justify-center text-[#897c61] dark:text-primary">
                         <span className="material-symbols-outlined">location_on</span>
                       </div>
                       <div>
                         <p className="text-xs font-semibold text-[#897c61] uppercase tracking-wide">Format</p>
                         <p className="text-[#181611] dark:text-white font-bold">{frontmatter.quick_facts.format}</p>
                       </div>
                    </div>
                    
                    {frontmatter.quick_facts.next_deadline && (
                       <>
                          <div className="w-full h-px bg-[#e6e2db] dark:bg-[#444] my-2"></div>
                          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                             <p className="text-sm text-[#181611] dark:text-white font-medium mb-1">Next Application Deadline</p>
                             <p className="text-primary font-bold text-lg">{frontmatter.quick_facts.next_deadline}</p>
                             <p className="text-xs text-gray-500 mt-1">For Fall 2025 Start</p>
                          </div>
                       </>
                    )}
                    
                    <button className="w-full py-3 px-4 bg-primary hover:bg-[#d99a22] text-[#181611] font-bold rounded-lg shadow-sm transition-colors text-center block">
                        Apply Now
                    </button>
                  </div>
                </div>
              )}

             {/* Contact Card */}
             {frontmatter.contact && (
                <div className="bg-[#f4f3f0] dark:bg-[#222] rounded-xl p-6 border border-[#e6e2db] dark:border-[#333]">
                   <h5 className="text-base font-bold text-[#181611] dark:text-white mb-4">Have Questions?</h5>
                   <div className="flex gap-4 mb-4">
                      <div 
                         className="w-12 h-12 rounded-full bg-gray-300 bg-cover bg-center" 
                         style={{ backgroundImage: `url("${withBasePath(frontmatter.contact.image)}")` }}
                      ></div>
                      <div>
                         <p className="text-sm font-bold text-[#181611] dark:text-white">{frontmatter.contact.name}</p>
                         <p className="text-xs text-[#897c61]">{frontmatter.contact.role}</p>
                      </div>
                   </div>
                   <a href={`mailto:${frontmatter.contact.email}`} className="flex items-center gap-2 text-sm text-[#181611] dark:text-white hover:text-primary font-medium">
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                      {frontmatter.contact.email}
                   </a>
                </div>
             )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
