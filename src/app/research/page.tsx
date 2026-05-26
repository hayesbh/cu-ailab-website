import { getContent } from "@/lib/content";
import { getPublications } from "@/lib/publications"; // Added import
import { ResearchPageContent, ResearchProject } from "@/types/content";
import { ResearchHero } from "@/components/research/ResearchHero";
import { ResearchProjectBrowser } from "@/components/research/ResearchProjectBrowser";
import { PublicationList } from "@/components/research/PublicationList";
import { FundingSupport } from "@/components/research/FundingSupport";
import { SHOW_PUBLICATIONS } from "@/lib/flags";

export default function ResearchPage() {
  const researchData = getContent<ResearchPageContent>("research");
  const publicationsData = getPublications();
  const projectsData = getContent<{ projects: ResearchProject[] }>("projects");
  
  // No longer just filtering by "featured" here, passing all projects to the browser component
  // Or should we? The user asked to "enable the category filters to work on the /research page"
  // Usually this page lists ALL projects, or just featured ones initially?
  // The existing code filtered by p.featured for FeaturedProjects.
  // But usually filters imply searching through ALL projects.
  // I will pass ALL projects to the browser.
  const allProjects = projectsData.projects;

  // Populate the "Research Themes" stat from the actual number of projects
  // instead of a hardcoded value, so it stays in sync with projects.yaml.
  const heroData = {
    ...researchData.hero,
    stats: researchData.hero.stats.map((stat) =>
      stat.label === "Research Themes"
        ? { ...stat, value: String(allProjects.length) }
        : stat
    ),
  };

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <ResearchHero data={heroData} />
      <ResearchProjectBrowser initialProjects={allProjects} categories={researchData.filters.categories} />
      {/* 
          Note: publications.yaml returns an object with a 'publications' array property 
          based on how we defined it (wrapped in 'publications' root key).
          Checking how getContent<T> behaves - it returns the whole yaml object.
          So if yaml is:
          publications:
            - ...
          Then data has .publications property.
      */}
      {SHOW_PUBLICATIONS && <PublicationList publications={publicationsData.publications} />}
      <FundingSupport logos={researchData.funding_logos} />
    </main>
  );
}
