"use client";

import { useState } from 'react';
import { PersonCard } from '@/components/shared/PersonCard';

interface Person {
  name: string;
  role: string;
  image: string;
  link: string;
  interests?: string[];
}

interface PeopleData {
  faculty: Person[];
  students: Person[];
}

interface PeopleBrowserProps {
  peopleData: PeopleData;
}

const FILTERS = ['All Members', 'Faculty', 'Postdocs', 'PhD Students', 'Alumni'];

export function PeopleBrowser({ peopleData }: PeopleBrowserProps) {
  const [activeFilter, setActiveFilter] = useState('All Members');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine all people for easier filtering
  const allPeople = [
    ...peopleData.faculty.map(p => ({ ...p, category: 'Faculty' })),
    ...peopleData.students.map(p => {
        // Simple heuristic to determine category from role if needed, 
        // or we rely on the role text itself. 
        // For now, let's assume the 'role' field maps reasonably well or we check specifically.
        let category = 'PhD Students';
        if (p.role.toLowerCase().includes('postdoc')) category = 'Postdocs';
        if (p.role.toLowerCase().includes('alum')) category = 'Alumni';
        if (p.role.toLowerCase().includes('undergrad') || p.role.toLowerCase().includes('master')) category = 'Students';
        return { ...p, category };
    })
  ];

  const filteredPeople = allPeople.filter(person => {
    // 1. Category Filter
    let matchesFilter = false;
    if (activeFilter === 'All Members') {
      matchesFilter = true;
    } else if (activeFilter === 'Faculty') {
       matchesFilter = person.category === 'Faculty';
    } else {
       // Check if the assigned category matches OR if the role contains the filter text
       // This covers cases where my heuristic above might be imperfect
       matchesFilter = person.category === activeFilter || person.role.includes(activeFilter);
    }

    // 2. Search Filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      person.name.toLowerCase().includes(query) ||
      person.role.toLowerCase().includes(query) ||
      person.interests?.some(i => i.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Filter Controls */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-background-alt dark:bg-card-dark text-text-muted dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {filter}
          </button>
        ))}
        
        <div className="ml-auto w-full max-w-xs relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
            <input 
                type="text" 
                placeholder="Search by name or keyword..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded bg-background-alt dark:bg-card-dark border-none text-sm focus:ring-1 focus:ring-primary"
            />
        </div>
      </div>

      {/* Mobile Search (visible only on small screens) */}
      <div className="mb-8 lg:hidden relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
        <input 
            type="text" 
            placeholder="Search by name or keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-background-alt dark:bg-card-dark border-none text-sm focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredPeople.map((person, index) => (
          <PersonCard key={`${person.name}-${index}`} person={person} />
        ))}

        {/* Join Card - Only show when viewing All Members or Students/Postdocs, or always? 
            Let's show it always unless it looks weird, or maybe only on 'All Members' and 'PhD Students' / 'Postdocs'
        */}
        {(activeFilter === 'All Members' || activeFilter === 'PhD Students' || activeFilter === 'Postdocs') && (
            <div className="flex flex-col items-center justify-center p-8 bg-background-alt dark:bg-card-dark rounded-xl border-2 border-dashed border-border-light dark:border-border-dark text-center h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl text-text-muted">person_add</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Join the Team</h3>
                <p className="text-sm text-text-muted dark:text-text-muted-dark mb-6 max-w-[200px]">
                    We are always looking for talented PhD students and Postdocs.
                </p>
                <a href="/join-us" className="text-primary font-bold text-sm hover:underline">
                    View Openings →
                </a>
            </div>
        )}
      </div>
      
      {filteredPeople.length === 0 && (
          <div className="text-center py-20 text-text-muted">
              <p>No members found matching your criteria.</p>
          </div>
      )}
    </div>
  );
}
