'use client';

import { useState, useMemo } from 'react';
import { ResearchProject } from '@/types/content';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ProjectsContentProps {
  projects: ResearchProject[];
  categories: string[];
}

export function ProjectsContent({ projects, categories }: ProjectsContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Research Areas');
  const [selectedStatus, setSelectedStatus] = useState('Active Projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const projectCategories = project.categories || (project.category ? [project.category] : []);
      const matchesCategory = 
        selectedCategory === 'All Research Areas' || 
        projectCategories.includes(selectedCategory);

      // Status filtering logic
      const isProjectActive = !project.status || project.status === 'Active' || project.status === 'New';
      const matchesStatus = 
        selectedStatus === 'All Statuses' ||
        (selectedStatus === 'Active Projects' && isProjectActive) ||
        (selectedStatus === 'Inactive Projects' && !isProjectActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="space-y-10">
      <section className="sticky top-[80px] z-40 py-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-sub">search</span>
            </div>
            <input 
              type="text"
              placeholder="Search by keywords, tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-[#3a3928] rounded-full text-text-main dark:text-white placeholder-text-sub dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-base transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-5 pr-10 py-3 bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-[#3a3928] rounded-full text-sm font-bold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-[#3e3d25] cursor-pointer focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              >
                <option>All Research Areas</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-sub">expand_more</span>
            </div>

            <div className="relative">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-5 pr-10 py-3 bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-[#3a3928] rounded-full text-sm font-bold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-[#3e3d25] cursor-pointer focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              >
                <option>Active Projects</option>
                <option>Inactive Projects</option>
                <option>All Statuses</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-sub">expand_more</span>
            </div>

            <button 
              onClick={() => setViewMode('grid')}
              className={`size-11 flex items-center justify-center rounded-full border transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-[#32311b] border-[#e5e5dc] dark:border-[#3a3928] text-text-main dark:text-white shadow-sm' 
                  : 'bg-transparent border-transparent text-text-sub dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-[#3e3d25]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`size-11 flex items-center justify-center rounded-full border transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-[#32311b] border-[#e5e5dc] dark:border-[#3a3928] text-text-main dark:text-white shadow-sm' 
                  : 'bg-transparent border-transparent text-text-sub dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-[#3e3d25]'
              }`}
              title="List View"
            >
              <span className="material-symbols-outlined">view_list</span>
            </button>
          </div>
        </div>
      </section>

      <section className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12" : "flex flex-col gap-6 pb-12"}>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-sub dark:text-gray-400">
            No projects found matching your criteria.
          </div>
        )}
      </section>
    </div>
  );
}
