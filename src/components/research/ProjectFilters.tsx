"use client";

import { useState } from "react";

interface ProjectFiltersProps {
  categories: string[];
}

export function ProjectFilters({ categories }: ProjectFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("All Areas");

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-text-sub">search</span>
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-[#32311b] border-none rounded-full text-text-main dark:text-white placeholder-text-sub dark:placeholder-gray-500 focus:ring-2 focus:ring-primary shadow-sm text-base"
            placeholder="Search projects, papers, or authors..."
          />
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#32311b] rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors dark:text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#32311b] rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#3e3d25] transition-colors dark:text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px]">sort</span>
            Newest
          </button>
        </div>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-primary text-text-main font-bold transition-transform active:scale-95"
                : "bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-transparent text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-[#3e3d25]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
