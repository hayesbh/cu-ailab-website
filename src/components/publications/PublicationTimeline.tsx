import { Publication } from '@/types/content';

interface PublicationTimelineProps {
  publications: Publication[];
}

export function PublicationTimeline({ publications }: PublicationTimelineProps) {
  // Group publications by year
  const groupedByYear = publications.reduce((acc, pub) => {
    const year = pub.year || 'Unknown';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  // Sort years matching the example (descending)
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

  return (
    <section className="relative">
      <div className="absolute left-4 md:left-[5.5rem] top-4 bottom-12 w-0.5 bg-gray-200 dark:bg-[#3a3928]"></div>
      
      {sortedYears.map((year) => (
        <div key={year} className="relative pb-12">
          {/* Year Header */}
          <div className="flex items-center mb-6">
            <div className="hidden md:block absolute left-0 w-24 text-right pr-6">
              <span className="text-2xl font-black text-text-sub/40 dark:text-white/40">{year}</span>
            </div>
            <div className="absolute left-4 md:left-[5.5rem] -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background-light dark:border-background-dark z-10 shadow-sm"></div>
            <div className="md:hidden pl-10">
              <span className="text-xl font-bold text-text-main dark:text-white">{year}</span>
            </div>
          </div>

          {/* Publications for this Year */}
          <div className="pl-10 md:pl-32 space-y-6">
            {groupedByYear[year].map((pub, index) => (
              <article key={index} className="bg-white dark:bg-[#32311b] rounded-[2rem] p-1 shadow-sm border border-[#e5e5dc] dark:border-[#3a3928] hover:shadow-md transition-shadow relative">
                <div className="hidden md:block absolute top-10 -left-8 w-8 h-0.5 bg-gray-200 dark:bg-[#3a3928]"></div>
                <div className="p-6 md:p-8 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {pub.award && (
                          <span className="px-3 py-1 bg-text-main text-primary text-xs font-bold rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">emoji_events</span> {pub.award}
                          </span>
                        )}
                        <span className="px-3 py-1 bg-[#f5f5f0] dark:bg-[#4a4930] text-text-main dark:text-gray-200 text-xs font-bold rounded-full">
                           {pub.venue} {pub.year}
                        </span>
                        {pub.month && (
                             <span className="text-xs font-medium text-text-sub dark:text-gray-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">calendar_month</span> {pub.month} {pub.year}
                             </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-text-main dark:text-white leading-tight mb-2">
                        {pub.title}
                      </h3>
                      <p 
                        className="text-text-sub dark:text-gray-300 font-medium"
                        dangerouslySetInnerHTML={{ 
                             __html: pub.authors.replace(/\*\*(.*?)\*\*/g, '<span class="text-text-main dark:text-white underline decoration-1 underline-offset-2 decoration-primary">$1</span>') 
                        }}
                      />
                    </div>
                    <div className="flex gap-2 shrink-0 self-start">
                      {pub.links.pdf && (
                        <a href={pub.links.pdf} className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e5e5dc] dark:border-[#55543d] bg-background-light dark:bg-[#2a2916] hover:bg-primary hover:border-primary text-xs font-bold transition-all dark:text-white dark:hover:text-text-main">
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span> PDF
                        </a>
                      )}
                      {pub.links.code && (
                        <a href={pub.links.code} className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e5e5dc] dark:border-[#55543d] bg-background-light dark:bg-[#2a2916] hover:bg-text-main hover:border-text-main hover:text-primary text-xs font-bold transition-all dark:text-white">
                          <span className="material-symbols-outlined text-[18px]">code</span> Code
                        </a>
                      )}
                      {pub.links.data && (
                        <a href={pub.links.data} className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e5e5dc] dark:border-[#55543d] bg-background-light dark:bg-[#2a2916] hover:bg-text-main hover:border-text-main hover:text-primary text-xs font-bold transition-all dark:text-white">
                          <span className="material-symbols-outlined text-[18px]">dataset</span> Data
                        </a>
                      )}
                       {/* Assuming 'video' link might be added to PublicationLink type, handling gracefully if present in yaml but not typed yet strictly or using standard links structure */}
                    </div>
                  </div>
                  {pub.abstract && (
                    <details className="group/abstract border-t border-[#e5e5dc] dark:border-[#3a3928] pt-4 mt-2">
                      <summary className="flex items-center gap-2 cursor-pointer w-fit text-sm font-bold text-text-sub hover:text-primary dark:hover:text-white transition-colors select-none">
                        <span className="material-symbols-outlined transition-transform duration-300 group-open/abstract:rotate-90">chevron_right</span>
                        View Abstract
                      </summary>
                      <div className="mt-4 text-text-main dark:text-gray-300 leading-relaxed pl-7 text-sm md:text-base max-w-4xl">
                        <p>{pub.abstract}</p>
                      </div>
                    </details>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
      
      <div className="flex justify-center pt-8">
        <button className="px-8 py-3 rounded-full border border-[#e5e5dc] dark:border-[#3a3928] bg-white dark:bg-[#32311b] text-text-main dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors shadow-sm">
            Load More
        </button>
      </div>
    </section>
  );
}
