import { getContent } from "@/lib/content";
import { ResearchProject, ResearchPageContent } from "@/types/content";
import { ProjectsContent } from "@/components/projects/ProjectsContent";

export const metadata = {
  title: "Projects | CAIR Lab",
  description: "Explore the diverse range of AI research initiatives at CAIR Lab.",
};

export default function ProjectsPage() {
  const projectsData = getContent<{ projects: ResearchProject[] }>("projects");
  const researchData = getContent<ResearchPageContent>("research");
  
  // Use categories from research.yaml filters for consistency
  const uniqueCategories = Array.from(new Set([
    ...researchData.filters.categories,
    // Extract categories from projects themselves to ensure all are covered
    ...projectsData.projects.flatMap(p => p.categories || (p.category ? [p.category] : []))
  ])).sort();

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-sm text-text-sub dark:text-gray-500">
          <a className="hover:text-text-main dark:hover:text-white transition-colors" href="/research">Research</a>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="text-text-main dark:text-white font-medium">All Projects</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight dark:text-white">Explore Projects</h2>
            <p className="mt-4 text-lg text-text-sub dark:text-gray-400 max-w-2xl">
              Discover the diverse range of AI research initiatives led by our faculty and students, spanning from theoretical foundations to real-world applications.
            </p>
          </div>
        </div>
      </section>

      <ProjectsContent projects={projectsData.projects} categories={uniqueCategories} />
    </main>
  );
}
