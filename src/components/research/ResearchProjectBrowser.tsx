"use client";

import { useState, useMemo } from "react";
import { ResearchProject } from "@/types/content";
import { ProjectFilters } from "./ProjectFilters";
import { FeaturedProjects } from "./FeaturedProjects";

interface ResearchProjectBrowserProps {
  initialProjects: ResearchProject[];
  categories: string[];
}

export function ResearchProjectBrowser({ initialProjects, categories }: ResearchProjectBrowserProps) {
  const [activeCategory, setActiveCategory] = useState("All Areas");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category Filter
      const matchesCategory =
        activeCategory === "All Areas" ||
        (project.categories &&
          project.categories.some(
            (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
          ));

      // Search Filter
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.categories &&
          project.categories.some((cat) => cat.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, activeCategory, searchQuery]);

  return (
    <>
      <ProjectFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <FeaturedProjects projects={filteredProjects} />
    </>
  );
}
