"use client";

import { useState, useMemo } from "react";
import { PublicationsContent } from "@/types/content";
import { PublicationStats } from "@/components/publications/PublicationStats";
import { CoAuthorshipNetwork } from "@/components/publications/CoAuthorshipNetwork";
import { PublicationFilters } from "@/components/publications/PublicationFilters";
import { PublicationTimeline } from "@/components/publications/PublicationTimeline";

interface PublicationsClientProps {
  data: PublicationsContent;
}

export function PublicationsClient({ data }: PublicationsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  // Extract unique filter options from data
  const { uniqueYears, uniqueVenues, uniqueAuthors } = useMemo(() => {
    const years = new Set<string>();
    const venues = new Set<string>();
    const authors = new Set<string>();

    data.publications.forEach(pub => {
      if (pub.year) years.add(pub.year);
      if (pub.venue) venues.add(pub.venue);
      // Rough parsing for authors from the display string. 
      const cleanAuthors = pub.authors
        .replace(/\*\*/g, '') // Remove bold markdown
        .split(',')
        .map(a => a.trim());
      
      cleanAuthors.forEach(a => authors.add(a));
    });

    return {
      uniqueYears: Array.from(years).sort().reverse(),
      uniqueVenues: Array.from(venues).sort(),
      uniqueAuthors: Array.from(authors).sort()
    };
  }, [data.publications]);

  const filteredPublications = useMemo(() => {
    return data.publications.filter(pub => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.abstract?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase());

      // Checkbox filters (OR logic within category, AND logic across categories)
      // If none selected, assume all allowed
      const matchesYear = selectedYears.length === 0 || (pub.year && selectedYears.includes(pub.year));
      const matchesVenue = selectedVenues.length === 0 || selectedVenues.includes(pub.venue);
      
      // For author, check if ANY selected author is in the pub's author list
      const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.some(author => pub.authors.includes(author));

      return matchesSearch && matchesYear && matchesVenue && matchesAuthor;
    });
  }, [data.publications, searchQuery, selectedYears, selectedVenues, selectedAuthors]);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-center gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight dark:text-white">
              Publications
            </h2>
            <p className="text-lg text-text-sub dark:text-gray-400 font-normal leading-relaxed">
              Explore our research output, venue distribution, and the interconnected network of collaborations across disciplines.
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-[#3a3928] rounded-full text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors dark:text-white shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export All BibTeX
            </button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <PublicationStats stats={data.stats.venue_distribution} />
        </div>
      </section>

      <CoAuthorshipNetwork data={data.network} />
      
      <PublicationFilters 
        onSearchChange={setSearchQuery}
        selectedYears={selectedYears}
        onYearsChange={setSelectedYears}
        selectedVenues={selectedVenues}
        onVenuesChange={setSelectedVenues}
        selectedAuthors={selectedAuthors}
        onAuthorsChange={setSelectedAuthors}
        years={uniqueYears}
        venues={uniqueVenues}
        authors={uniqueAuthors}
      />
      
      <PublicationTimeline publications={filteredPublications} />
      
    </main>
  );
}
