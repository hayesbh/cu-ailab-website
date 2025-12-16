import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  title: string;
  date: string;
  type: string;
  summary: string;
  location?: string;
  authors?: { name: string; image: string }[];
  link: string;
}

interface LatestUpdatesProps {
  data: {
    title: string;
    subtitle: string;
  };
  news: NewsItem[];
}

export function LatestUpdates({ data, news }: LatestUpdatesProps) {
  return (
    <section className="py-24 bg-background-alt dark:bg-card-dark">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar (Events) */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-background-dark rounded shadow-sm p-6 h-full flex flex-col sticky top-24">
              <div className="flex items-center justify-between mb-6 border-b border-border-light dark:border-border-dark pb-4">
                <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  Upcoming Events
                </h3>
                <Link href="/events" className="text-xs font-bold text-primary hover:text-primary-hover uppercase tracking-wider">
                  View All
                </Link>
              </div>
              
              <div className="flex flex-col gap-6">
                 {/* Sample Events - hardcoded as in example */}
                 <div className="group flex gap-4">
                   <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-background-alt dark:bg-card-dark rounded border border-border-light dark:border-border-dark group-hover:border-primary transition-colors">
                     <span className="text-xs font-bold text-primary uppercase">Oct</span>
                     <span className="text-xl font-bold text-black dark:text-white leading-none">12</span>
                   </div>
                   <div className="flex flex-col">
                     <h4 className="font-bold text-sm text-black dark:text-white group-hover:text-cu-blue transition-colors mb-1">
                       <Link href="#">Transformer Architectures Seminar</Link>
                     </h4>
                     <p className="text-xs text-text-muted dark:text-text-muted-dark mb-1 line-clamp-2">
                       Deep dive into the latest efficiency improvements.
                     </p>
                     <div className="flex items-center gap-3 text-[10px] font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-wide">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> 2:00 PM</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">location_on</span> DLC 1B50</span>
                     </div>
                   </div>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                 <div className="bg-primary/10 rounded p-4 border border-primary/20">
                    <h5 className="text-xs font-bold text-primary uppercase mb-1">Mark Your Calendar</h5>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">
                        The annual CAIR Symposium is scheduled for Dec 15th.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* News Feed */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2 text-black dark:text-white">{data.title}</h2>
                <p className="text-lg text-text-muted dark:text-text-muted-dark">{data.subtitle}</p>
              </div>
              <Link href="/news" className="text-sm font-bold border-b-2 border-primary pb-0.5 hover:text-primary transition-colors text-black dark:text-white">
                View Archive
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {news.map((item, index) => (
                <article 
                  key={index}
                  className={`group relative flex flex-col h-full bg-white dark:bg-background-dark rounded shadow-sm hover:shadow-md p-6 border-l-4 transition-all ${
                    item.type === 'Publication' ? 'border-l-primary' : 'border-l-black dark:border-l-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      item.type === 'Publication' ? 'text-primary' : 'text-black dark:text-gray-400'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-text-muted dark:text-text-muted-dark">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-cu-blue transition-colors">
                    <Link href={item.link}>{item.title}</Link>
                  </h3>
                  <p className="text-text-muted dark:text-text-muted-dark text-sm mb-6 flex-grow">
                    {item.summary}
                  </p>
                  
                  {item.location && (
                    <div className="mt-auto pt-2 border-t border-border-light dark:border-border-dark w-full">
                      <div className="flex items-center gap-2 text-xs font-medium mt-2 text-text-muted dark:text-text-muted-dark">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {item.location}
                      </div>
                    </div>
                  )}

                  {item.authors && (
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="flex -space-x-2">
                        {item.authors.map((author, i) => (
                          <img 
                            key={i}
                            src={author.image} 
                            alt={author.name} 
                            className="h-8 w-8 rounded-full border-2 border-white dark:border-card-dark" 
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-text-muted dark:text-text-muted-dark">
                        {item.authors.length > 1 ? 'Authors' : item.authors[0].name}
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
