import { Publication } from '@/types/content';
import Link from 'next/link';

interface PublicationListProps {
  publications: Publication[];
}

export function PublicationList({ publications }: PublicationListProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-text-main dark:text-white">Recent Publications</h3>
      </div>
      <div className="flex flex-col rounded-[2rem] bg-white dark:bg-[#32311b] overflow-hidden shadow-sm border border-[#e5e5dc] dark:border-[#3a3928]">
        {publications.map((pub, index) => (
          <div 
            key={index} 
            className="group border-b border-[#f0f0eb] dark:border-[#3a3928] p-6 sm:p-8 hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors relative last:border-0"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  {pub.award && (
                     <span className="text-xs font-bold text-text-main bg-primary px-2 py-0.5 rounded-md">{pub.award}</span>
                  )}
                  <span className="text-xs font-bold text-text-sub dark:text-gray-400">{pub.venue}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-text-main dark:text-white leading-tight group-hover:text-text-sub transition-colors cursor-pointer">
                  {pub.title}
                </h4>
                {/* We render authors as HTML because they contain markdown-like bolding for specific authors */}
                <p 
                    className="text-sm text-text-sub dark:text-gray-400 font-medium" 
                    dangerouslySetInnerHTML={{ 
                        // Simple replace for **text** to span with bold class, 
                        // assuming trusted content or simple requirement. 
                        // For a real app, use a proper markdown parser.
                        __html: pub.authors.replace(/\*\*(.*?)\*\*/g, '<span class="text-text-main dark:text-white underline decoration-1 underline-offset-2">$1</span>') 
                    }}
                />
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0 shrink-0">
                {pub.links.pdf && (
                    <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#e5e5dc] dark:border-[#55543d] hover:border-primary hover:bg-primary/10 text-xs font-bold transition-all dark:text-white">
                        <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span> PDF
                    </button>
                )}
                {pub.links.code && (
                    <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#e5e5dc] dark:border-[#55543d] hover:border-text-main hover:bg-gray-100 dark:hover:bg-[#4a4930] text-xs font-bold transition-all dark:text-white">
                        <span className="material-symbols-outlined text-[16px]">code</span> Code
                    </button>
                )}
                {pub.links.data && (
                    <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#e5e5dc] dark:border-[#55543d] hover:border-text-main hover:bg-gray-100 dark:hover:bg-[#4a4930] text-xs font-bold transition-all dark:text-white">
                        <span className="material-symbols-outlined text-[16px]">dataset</span> Data
                    </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link 
          href="/publications" 
          className="px-8 py-3 rounded-full border border-[#e5e5dc] dark:border-[#3a3928] bg-white dark:bg-[#32311b] text-text-main dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors shadow-sm"
        >
            View All Publications
        </Link>
      </div>
    </section>
  );
}
