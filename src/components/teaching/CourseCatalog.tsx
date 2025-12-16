'use client';

import React, { useState } from 'react';
import type { Course } from './CourseInteractions';

interface CourseCatalogProps {
  courses: Course[];
  filters: { semesters: string[] };
}

export function CourseCatalog({ courses, filters }: CourseCatalogProps) {
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');

  const filteredCourses = semesterFilter === 'All Semesters' 
    ? courses 
    : courses.filter(c => {
         // This assumes the format "Fall 2024" matches just "Fall" or we have explicit year mapping.
         // Based on yaml: semesters: ["Fall", "Spring"] and filter: "Fall 2024".
         // Simple partial match for demo purposes
         const sem = semesterFilter.split(' ')[0]; 
         return c.semesters.includes(sem);
    });

  return (
    <>
    <section className="px-4 md:px-10 py-12 bg-white dark:bg-background-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <h2 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight">Full Course Catalog</h2>
          <div className="flex gap-2">
            <div className="relative">
              <select 
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
                className="appearance-none bg-[#f5f5f0] dark:bg-white/5 border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-text-main dark:text-white focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option>All Semesters</option>
                {filters.semesters.map(op => <option key={op}>{op}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2 text-text-light pointer-events-none">expand_more</span>
            </div>
            {/* Filter button - strictly visual for now or could open more filters */}
            <button className="flex items-center gap-2 bg-[#f5f5f0] dark:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium text-text-main dark:text-white hover:bg-primary hover:text-text-main transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e6e6db] dark:border-white/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f5f5f0] dark:bg-white/5 text-gray-900 dark:text-gray-200 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4 rounded-tl-xl">Code</th>
                <th className="p-4">Course Title</th>
                <th className="p-4">Instructor</th>
                <th className="p-4 rounded-tr-xl">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e6db] dark:divide-white/10 text-sm">
              {filteredCourses.map(course => (
                 <tr key={course.id} className="group hover:bg-[#f9f506]/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-text-main dark:text-white">{course.code}</td>
                    <td className="p-4 font-medium text-text-main dark:text-white">{course.title}</td>
                    <td className="p-4 text-text-main/80 dark:text-gray-300">{course.instructor}</td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                            course.level === 'Graduate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            course.level === 'PhD' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>{course.level}</span>
                    </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-center">
            <button className="text-sm font-medium text-text-light hover:text-primary transition-colors flex items-center gap-1">
                Load More Courses <span className="material-symbols-outlined">expand_more</span>
            </button>
        </div>
      </div>
    </section>

    </>
  );
}
