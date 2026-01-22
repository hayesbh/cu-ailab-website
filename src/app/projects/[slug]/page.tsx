import React from 'react';
import { getProjectData, getAllProjectSlugs } from '@/lib/projectUtils';
import { withBasePath } from '@/lib/paths';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllProjectSlugs();
  return paths.map((path) => path.params);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content } = getProjectData(slug);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="flex items-center gap-2 text-sm text-text-sub dark:text-gray-500">
        <Link 
          href="/research" 
          className="hover:text-text-main dark:hover:text-white transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Research
        </Link>
        <span className="opacity-50">/</span>
        <Link href="/projects" className="hover:text-text-main dark:hover:text-white transition-colors">
          Projects
        </Link>
      </div>

      <header className="flex flex-col gap-6 max-w-4xl">
        <div className="flex flex-wrap gap-2">
          {frontmatter.categories.map((category: string) => (
             <span key={category} className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                category === 'Climate AI' ? 'bg-primary text-text-main' : 'bg-white border border-[#e5e5dc] dark:bg-[#32311b] dark:border-[#3a3928] dark:text-gray-300 text-text-main'
             }`}>
              {category}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight dark:text-white">
          {frontmatter.title}
        </h1>
        {frontmatter.subtitle && (
          <p className="text-xl md:text-2xl text-text-sub dark:text-gray-400 font-normal leading-relaxed">
            {frontmatter.subtitle}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 space-y-12">
          {frontmatter.hero_image && (
            <div className="w-full rounded-[2rem] overflow-hidden shadow-sm aspect-video bg-gray-100 dark:bg-[#32311b]">
              <img 
                src={withBasePath(frontmatter.hero_image)} 
                alt={frontmatter.title} 
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>
          )}

          <article className="prose prose-lg dark:prose-invert max-w-none text-text-main dark:text-gray-300 leading-relaxed font-display">
            <ReactMarkdown
              components={{
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-4 text-text-main dark:text-white" {...props} />,
                p: ({node, ...props}) => <p className="mb-6" {...props} />,
                blockquote: ({node, ...props}) => (
                   <div className="my-10 p-8 bg-background-light dark:bg-[#32311b] rounded-[2rem] border-l-4 border-primary">
                     {props.children}
                   </div>
                ),
                img: ({node, ...props}) => (
                   <div className="my-8 rounded-[2rem] overflow-hidden bg-black relative aspect-video group cursor-pointer">
                      {/* TODO: Add play button overlay if it's a video/simulation demo, for now just rendering image */}
                      <img className="w-full h-full object-cover opacity-80" {...props} src={withBasePath(props.src as string)} />
                   </div>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {frontmatter.related_publications && frontmatter.related_publications.length > 0 && (
            <section className="border-t border-[#e5e5dc] dark:border-[#3a3928] pt-10">
              <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6">Related Publications</h3>
              <div className="space-y-4">
                {frontmatter.related_publications.map((pub: any, idx: number) => (
                  <div key={idx} className="group p-6 rounded-[1.5rem] bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-[#3a3928] hover:shadow-sm transition-all">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-lg dark:text-white mb-1 group-hover:text-primary transition-colors">{pub.title}</h4>
                        <p className="text-sm text-text-sub dark:text-gray-400">{pub.venue} • <span className="font-medium">{pub.authors}</span></p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button className="size-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-[#3e3d25] hover:bg-primary dark:hover:bg-primary text-text-main transition-colors">
                          <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="p-6 bg-white dark:bg-[#32311b] rounded-[2rem] border border-[#e5e5dc] dark:border-[#3a3928]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-sub dark:text-gray-500 mb-4">Project Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-[#3e3d25]">
                <span className="text-sm font-medium dark:text-gray-300">Status</span>
                <span className={`px-2 py-1 text-xs font-bold rounded-md ${frontmatter.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {frontmatter.status}
                </span>
              </div>
              {frontmatter.duration && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-[#3e3d25]">
                  <span className="text-sm font-medium dark:text-gray-300">Duration</span>
                  <span className="text-sm font-bold dark:text-white">{frontmatter.duration}</span>
                </div>
              )}
              {frontmatter.funding && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium dark:text-gray-300">Funding</span>
                  <span className="text-sm font-bold dark:text-white">{frontmatter.funding}</span>
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#3e3d25]">
              <button className="w-full py-3 bg-text-main dark:bg-white text-white dark:text-text-main rounded-full font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">mail</span>
                Contact Team
              </button>
            </div>
          </div>

          {frontmatter.team && frontmatter.team.pis && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-text-sub dark:text-gray-500 mb-6 border-b border-[#e5e5dc] dark:border-[#3a3928] pb-2">Principal Investigators</h3>
              <div className="space-y-6">
                {frontmatter.team.pis.map((pi: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="size-14 rounded-full bg-gray-200 dark:bg-[#3e3d25] flex items-center justify-center text-xl font-bold text-text-sub dark:text-gray-400">
                      {pi.initials || pi.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg dark:text-white leading-tight">
                        <a href="#" className="hover:underline decoration-primary decoration-2">{pi.name}</a>
                      </h4>
                      <p className="text-sm text-text-sub dark:text-gray-400">{pi.role}</p>
                      {pi.department && <p className="text-xs text-text-sub dark:text-gray-500 mt-0.5">{pi.department}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {frontmatter.team && frontmatter.team.researchers && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-text-sub dark:text-gray-500 mb-6 border-b border-[#e5e5dc] dark:border-[#3a3928] pb-2">Researchers</h3>
              <div className="space-y-4">
                {frontmatter.team.researchers.map((researcher: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-[1.5rem] hover:bg-white hover:dark:bg-[#32311b] hover:shadow-sm transition-all -mx-3">
                    <div className="size-10 rounded-full bg-gray-100 dark:bg-[#3e3d25] overflow-hidden">
                       {/* Placeholder avatar */}
                       <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm dark:text-white">{researcher.name}</h4>
                      <p className="text-xs text-text-sub dark:text-gray-400">{researcher.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-text-sub dark:text-gray-500 mb-4 border-b border-[#e5e5dc] dark:border-[#3a3928] pb-2">Topics</h3>
             <div className="flex flex-wrap gap-2">
               {/* Use categories or topics if available */}
               {(frontmatter.topics || frontmatter.categories).map((topic: string) => (
                  <a key={topic} href="#" className="px-3 py-1 bg-white border border-[#e5e5dc] dark:bg-[#32311b] dark:border-[#3a3928] dark:text-gray-300 text-text-main text-xs font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors">
                    {topic}
                  </a>
               ))}
             </div>
          </div>

        </aside>
      </div>
    </main>
  );
}
