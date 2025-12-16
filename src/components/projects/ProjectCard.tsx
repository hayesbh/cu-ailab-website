import Link from 'next/link';
import { ResearchProject } from '@/types/content';

interface ProjectCardProps {
  project: ResearchProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative h-[400px] bg-white dark:bg-[#32311b] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e5e5dc] dark:border-[#3a3928]">
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.95]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 justify-end text-white">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex gap-2 mb-3 opacity-100 group-hover:opacity-100 transition-opacity delay-100">
            {project.categories ? (
              project.categories.map((cat, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-primary text-text-main text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {cat}
                </span>
              ))
            ) : project.category ? (
              <span className="px-2.5 py-1 bg-primary text-text-main text-[10px] font-bold uppercase tracking-wider rounded-md">
                {project.category}
              </span>
            ) : null}
            
            {project.status && (
               <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/30">
                 {project.status}
               </span>
            )}
          </div>
          
          <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:mb-3">
            {project.title}
          </h3>
          
          <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <p className="text-gray-200 text-sm leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>
            <Link 
              href={project.external_url || "#"}
              className="w-full py-3 bg-white text-text-main font-bold rounded-full text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              View Project Details
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
