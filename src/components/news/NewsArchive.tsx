'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { withBasePath } from '@/lib/paths';

export interface NewsItem {
  title: string;
  date: string; // "YYYY-MM-DD"
  type: string;
  summary: string;
  location?: string;
  authors?: { name: string; image: string }[];
  link?: string;
  link_text?: string;
}

interface NewsArchiveProps {
  news: NewsItem[];
}

export function NewsArchive({ news }: NewsArchiveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Extract unique years from data
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(news.map(item => new Date(item.date).getFullYear().toString())));
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, [news]);

  // Filter logic
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || item.type === selectedCategory;
      const matchYear = !selectedYear || new Date(item.date).getFullYear().toString() === selectedYear;
      
      return matchSearch && matchCategory && matchYear;
    });
  }, [news, searchQuery, selectedCategory, selectedYear]);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categories = ['All', 'Publication', 'Grant', 'Event', 'Award']; 
  // Note: Pluralization in UI ('Publications') vs Singular in Data ('Publication'). 
  // I will map UI labels to data values or just use data values.
  // Example data uses: "Publication", "Grant", "Seminar", "Award".
  // Check example UI: "Publications", "Grants", "Events" (Seminar?), "Awards".
  
  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return 'All';
    if (cat === 'Publication') return 'Publications';
    if (cat === 'Grant') return 'Grants';
    if (cat === 'Event' || cat === 'Seminar') return 'Events';
    if (cat === 'Award') return 'Awards';
    return cat + 's';
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-8 sm:py-12">
      {/* Page Title */}
      <div className="flex flex-col gap-3 mb-12">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">News Archive</h1>
        <p className="text-text-muted dark:text-gray-400 text-lg max-w-2xl">
          Latest updates, publications, and announcements from the Colorado AI Research lab.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar: Filters & Search */}
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-8">
          {/* Search */}
          <div className="bg-white dark:bg-[#2a2915] p-6 rounded-xl shadow-sm border border-[#f0f0eb] dark:border-[#3a392a]">
            <h3 className="font-bold text-lg mb-4">Search</h3>
            <label className="flex w-full items-center rounded-full bg-background-light dark:bg-background-dark border border-transparent focus-within:border-primary transition-colors px-4 h-12">
              <span className="material-symbols-outlined text-text-muted">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-text-main dark:text-white w-full h-full text-sm placeholder:text-text-muted ml-2 outline-none" 
                placeholder="Keywords..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-[#2a2915] p-6 rounded-xl shadow-sm border border-[#f0f0eb] dark:border-[#3a392a]">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Publication', 'Grant', 'Seminar', 'Award'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-8 px-4 rounded-full text-sm font-bold shadow-sm transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-primary text-text-main' 
                      : 'bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-gray-300'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Archive Year */}
          <div className="bg-white dark:bg-[#2a2915] p-6 rounded-xl shadow-sm border border-[#f0f0eb] dark:border-[#3a392a]">
            <h3 className="font-bold text-lg mb-4">Year</h3>
            <ul className="flex flex-col gap-2">
              <li>
                 <button 
                    onClick={() => setSelectedYear(null)}
                    className={`flex w-full items-center justify-between text-sm transition-colors ${!selectedYear ? 'font-bold text-text-main dark:text-white' : 'text-text-muted hover:text-text-main'}`}
                  >
                    All Years
                    {!selectedYear && <span className="material-symbols-outlined text-base text-primary">arrow_forward</span>}
                 </button>
              </li>
              {years.map(year => (
                <li key={year}>
                  <button 
                    onClick={() => setSelectedYear(year)}
                    className={`flex w-full items-center justify-between text-sm transition-colors ${
                      selectedYear === year 
                        ? 'font-bold text-text-main dark:text-white' 
                        : 'text-text-muted hover:text-text-main dark:hover:text-white'
                    }`}
                  >
                    {year}
                    {selectedYear === year && <span className="material-symbols-outlined text-base text-primary">arrow_forward</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Content: News Feed */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="flex flex-col relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 md:left-6 top-4 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            {filteredNews.length === 0 ? (
               <div className="pl-16 py-12 text-text-muted">No news items found.</div>
            ) : filteredNews.map((item, index) => (
              <article key={index} className="relative pl-12 md:pl-16 pb-12 group">
                {/* Timeline Dot */}
                <div className="absolute left-2 md:left-4 top-1 size-4 md:size-5 rounded-full bg-white dark:bg-background-dark border-4 border-gray-300 dark:border-gray-600 group-hover:border-primary transition-colors z-10"></div>
                
                <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#2a2915] p-6 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm transition-all hover:shadow-md">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-bold text-text-muted dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md">
                        {formatDate(item.date)}
                      </span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-muted font-medium">{item.type}</span>
                    </div>
                    
                    {item.link ? (
                      <h3 className="text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">
                        <Link href={item.link || '#'}>{item.title}</Link>
                      </h3>
                    ) : (
                      <h3 className="text-2xl font-bold text-text-main dark:text-white transition-colors">
                        {item.title}
                      </h3>
                    )}

                    <p className="text-text-muted dark:text-gray-400 leading-relaxed">
                      {item.summary}
                    </p>
                    
                    {item.location && (
                       <div className="flex items-center gap-2 text-sm text-text-muted italic">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          {item.location}
                       </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      {item.link && (
                        <Link href={item.link} className="inline-flex items-center gap-1 text-sm font-bold border-b-2 border-primary hover:border-black dark:hover:border-white transition-colors pb-0.5">
                            {item.link_text || 'Read Full Article'}
                            <span className="material-symbols-outlined text-sm">arrow_outward</span>
                        </Link>
                      )}

                       {/* Authors for fallback if no image? */}
                       {item.authors && (
                        <div className="flex -space-x-2">
                           {item.authors.map((author, i) => (
                             <img 
                               key={i}
                               src={withBasePath(author.image)} 
                               alt={author.name} 
                               title={author.name}
                               className="h-8 w-8 rounded-full border-2 border-white dark:border-[#2a2915]" 
                             />
                           ))}
                        </div>
                       )}
                    </div>
                  </div>
                  
                  {/* Image - Use first author image if available and no explicit main image? 
                      The design has a large image on the right. 
                      Since we don't have main images in news.yaml, maybe skip this or use a placeholder?
                      The user said "not all entries need a link out". 
                      Wait, "Link" IS present in yaml.
                      
                      User said: "each item should be able to be self-contained".
                      But current yaml structure has links.
                      For now I will skip the big image on the right as we lack data, 
                      and rely on the author images I added above. 
                  */}
                </div>
              </article>
            ))}

            {/* Pagination (omitted for now as we might not need it for small dataset, or use simple slice)
                For now, display all. */
            }
          </div>
        </div>
      </div>
    </div>
  );
}
