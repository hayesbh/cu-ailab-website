"use client";

import { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelectDropdown({ label, options, selected, onChange }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 pl-4 pr-3 py-3 rounded-full text-sm font-bold border transition-colors shadow-sm min-w-[140px] ${
          selected.length > 0 
            ? "bg-primary text-text-main border-primary"
            : "bg-white dark:bg-[#32311b] text-text-main dark:text-white border-[#e5e5dc] dark:border-[#3a3928] hover:border-primary"
        }`}
      >
        <span className="truncate max-w-[120px]">
          {selected.length === 0 ? label : `${label} (${selected.length})`}
        </span>
        <span className="material-symbols-outlined text-sm">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-56 bg-white dark:bg-[#32311b] rounded-xl shadow-xl border border-[#e5e5dc] dark:border-[#3a3928] overflow-hidden z-50 flex flex-col max-h-64">
          <div className="overflow-y-auto p-2 space-y-1">
            {options.map(option => (
              <label 
                key={option} 
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#3e3d25] cursor-pointer"
              >
                <div className={`size-4 rounded border flex items-center justify-center transition-colors ${
                  selected.includes(option)
                    ? "bg-primary border-primary"
                    : "border-gray-300 dark:border-gray-600"
                }`}>
                  {selected.includes(option) && (
                    <span className="material-symbols-outlined text-[14px] text-text-main">check</span>
                  )}
                </div>
                <span className="text-sm font-medium text-text-main dark:text-gray-200">{option}</span>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
              </label>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="p-2 border-t border-[#e5e5dc] dark:border-[#3a3928] bg-gray-50 dark:bg-[#2a2916]">
              <button 
                onClick={() => onChange([])}
                className="w-full text-xs font-bold text-text-sub hover:text-primary transition-colors py-1"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface PublicationFiltersProps {
  onSearchChange: (query: string) => void;
  selectedYears: string[];
  onYearsChange: (years: string[]) => void;
  selectedVenues: string[];
  onVenuesChange: (venues: string[]) => void;
  selectedAuthors: string[];
  onAuthorsChange: (authors: string[]) => void;
  years: string[];
  venues: string[];
  authors: string[];
}

export function PublicationFilters({ 
  onSearchChange, 
  selectedYears,
  onYearsChange,
  selectedVenues,
  onVenuesChange,
  selectedAuthors,
  onAuthorsChange,
  years,
  venues,
  authors
}: PublicationFiltersProps) {
  return (
    <section className="sticky top-20 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-4 border-b border-[#e5e5dc] dark:border-[#3a3928] -mx-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-text-sub">search</span>
          </div>
          <input 
            type="text" 
            className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-[#32311b] border border-[#e5e5dc] dark:border-[#3a3928] rounded-full text-text-main dark:text-white placeholder-text-sub dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-base transition-shadow" 
            placeholder="Search by title, abstract, or keywords..." 
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 shrink-0">
          <MultiSelectDropdown 
            label="Year" 
            options={years} 
            selected={selectedYears} 
            onChange={onYearsChange} 
          />
          <MultiSelectDropdown 
            label="Venue" 
            options={venues} 
            selected={selectedVenues} 
            onChange={onVenuesChange} 
          />
          <MultiSelectDropdown 
            label="Author" 
            options={authors} 
            selected={selectedAuthors} 
            onChange={onAuthorsChange} 
          />
        </div>
      </div>
    </section>
  );
}
