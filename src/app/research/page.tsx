import { getContent } from "@/lib/content";
import { getPublications } from "@/lib/publications"; // Added import
import { ResearchPageContent, PublicationsContent, ResearchProject } from "@/types/content";
import { ResearchHero } from "@/components/research/ResearchHero";
import { ProjectFilters } from "@/components/research/ProjectFilters";
import { FeaturedProjects } from "@/components/research/FeaturedProjects";
import { PublicationList } from "@/components/research/PublicationList";
import { FundingSupport } from "@/components/research/FundingSupport";

export default function ResearchPage() {
  const researchData = getContent<ResearchPageContent>("research");
  const publicationsData = getPublications();
  const projectsData = getContent<{ projects: ResearchProject[] }>("projects");
  
  const featuredProjects = projectsData.projects.filter(p => p.featured);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <ResearchHero data={researchData.hero} />
      <ProjectFilters categories={researchData.filters.categories} />
      <FeaturedProjects projects={featuredProjects} />
      {/* 
          Note: publications.yaml returns an object with a 'publications' array property 
          based on how we defined it (wrapped in 'publications' root key).
          Checking how getContent<T> behaves - it returns the whole yaml object.
          So if yaml is:
          publications:
            - ...
          Then data has .publications property.
      */}
      <PublicationList publications={publicationsData.publications} />
      <FundingSupport logos={researchData.funding_logos} />
    </main>
  );
}
