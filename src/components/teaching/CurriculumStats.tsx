import React from 'react';
import type { Course } from './CourseInteractions';

interface CurriculumStatsProps {
  courses: Course[];
  selectedIds: Set<string>;
  onRemove: (id: string) => void;
}

export function CurriculumStats({ courses, selectedIds, onRemove }: CurriculumStatsProps) {
  const selectedCourses = courses.filter(c => selectedIds.has(c.id));
  
  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);
  
  // Calculate skills
  const skillsTotal: { [key: string]: number } = {
    ML: 0,
    NLP: 0,
    Vision: 0,
    Ethics: 0,
    Robotics: 0,
    MLOps: 0
  };

  selectedCourses.forEach(c => {
    Object.entries(c.skills).forEach(([skill, val]) => {
      if (skillsTotal[skill] !== undefined) {
        skillsTotal[skill] += val;
      }
    });
  });

  // Max value for normalization (arbitrary max for visualization)
  const MAX_SKILL = 100;

  return (
    <div className="w-full xl:w-[360px] flex-shrink-0 flex flex-col gap-6">
      <div className="bg-white dark:bg-background-dark rounded-xl border border-[#e6e6db] dark:border-white/10 p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#f5f5f0] dark:border-white/10 pb-4">
          <div className="p-2 bg-primary rounded-lg text-text-main">
            <span className="material-symbols-outlined block">school</span>
          </div>
          <div>
            <h3 className="text-text-main dark:text-white font-bold text-lg">Your Curriculum</h3>
            <p className="text-text-muted text-sm">Draft Plan</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Credits</p>
            <p className="text-text-main dark:text-white text-2xl font-bold">{totalCredits}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Courses</p>
            <p className="text-text-main dark:text-white text-2xl font-bold">{selectedCourses.length}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
            <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Selected Courses</p>
            <div className="flex flex-wrap gap-2">
                {selectedCourses.length === 0 && <span className="text-sm text-gray-400 italic">Select courses to begin</span>}
                {selectedCourses.map(course => (
                    <span key={course.id} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-text-main dark:text-white text-xs font-semibold">
                        {course.code.split(' ')[1]}
                        <button onClick={() => onRemove(course.id)} className="hover:text-red-500 flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* Skills Chart */}
      <div className="bg-white dark:bg-background-dark rounded-xl border border-[#e6e6db] dark:border-white/10 p-6 flex flex-col gap-4 shadow-sm">
         <div className="flex justify-between items-center mb-2">
            <p className="text-text-main dark:text-white text-base font-bold">Skills Acquired</p>
            <span className="material-symbols-outlined text-primary">radar</span>
         </div>
         <div className="grid min-h-[160px] grid-flow-col gap-3 grid-rows-[1fr_auto] items-end justify-items-center">
            {Object.entries(skillsTotal).filter(([k]) => k !== 'Python').map(([skill, value]) => (
                <div key={skill} className="w-full flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary/20 rounded-t-lg relative h-[120px]">
                        <div 
                            className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" 
                            style={{ height: `${Math.min((value / MAX_SKILL) * 100, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-text-muted text-[11px] font-bold tracking-wider">{skill}</p>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
