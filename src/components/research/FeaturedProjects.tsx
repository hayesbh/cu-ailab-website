import { ResearchProject } from '@/types/content';
import Link from 'next/link';
import { withBasePath } from '@/lib/paths';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface FeaturedProjectsProps {
  projects?: ResearchProject[];
}

export function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-text-main dark:text-white">Featured Projects</h3>
        <Link 
          href={withBasePath("/projects")} 
          className="text-sm font-bold underline decoration-2 decoration-primary underline-offset-4 hover:text-text-sub dark:text-primary dark:hover:text-white transition-colors"
        >
          View All Projects
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
