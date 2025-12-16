'use client';

import React, { useState, useEffect } from 'react';
import { CourseTree } from './CourseTree';
import { CurriculumStats } from './CurriculumStats';

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  type: 'core' | 'elective';
  semesters: string[];
  requisites: string[];
  skills: { [key: string]: number };
  instructor: string;
  status: string;
  level: string;
  coordinates: { x: number; y: number };
  icon: string;
}

interface CourseInteractionsProps {
  courses: Course[];
}

export function CourseInteractions({ courses }: CourseInteractionsProps) {
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(new Set());

  // Helper to find all courses that depend on a given course ID (recursively)
  const getRecursiveDependents = (courseId: string, allCourses: Course[]): Set<string> => {
    const dependents = new Set<string>();
    const stack = [courseId];
    
    while (stack.length > 0) {
      const currentId = stack.pop()!;
      // Find direct dependents: courses that list currentId as a requisite
      const directDependents = allCourses.filter(c => c.requisites.includes(currentId));
      
      directDependents.forEach(dep => {
        if (!dependents.has(dep.id)) {
           dependents.add(dep.id);
           stack.push(dep.id);
        }
      });
    }
    return dependents;
  };

  const totalCredits = React.useMemo(() => {
    let total = 0;
    selectedCourseIds.forEach(id => {
      const c = courses.find(course => course.id === id);
      if (c) total += c.credits;
    });
    return total;
  }, [selectedCourseIds, courses]);

  const toggleCourse = (courseId: string) => {
    const newSelected = new Set(selectedCourseIds);
    if (newSelected.has(courseId)) {
      // Deselect: also remove all dependents
      newSelected.delete(courseId);
      const dependents = getRecursiveDependents(courseId, courses);
      dependents.forEach(depId => newSelected.delete(depId));
    } else {
      // Select: Check if unlocked AND if under credit limit
      if (totalCredits >= 30) return; // Prevent selection if at or over limit

      if (isCourseUnlocked(courseId, newSelected, courses)) {
         newSelected.add(courseId);
      }
    }
    setSelectedCourseIds(newSelected);
  };

  const removeCourse = (courseId: string) => {
      // Same logic as deselecting in toggle
      const newSelected = new Set(selectedCourseIds);
      if (newSelected.has(courseId)) {
          newSelected.delete(courseId);
          const dependents = getRecursiveDependents(courseId, courses);
          dependents.forEach(depId => newSelected.delete(depId));
          setSelectedCourseIds(newSelected);
      }
  }

  // Helper to check locks
  const isCourseUnlocked = (courseId: string, currentSelected: Set<string>, allCourses: Course[]) => {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return false;
    if (course.requisites.length === 0) return true;
    return course.requisites.every(reqId => currentSelected.has(reqId));
  };

  return (
    <div className="layout-container px-4 md:px-10 py-12 flex flex-col xl:flex-row gap-8 max-w-[1400px] mx-auto">
      <CourseTree 
        courses={courses} 
        selectedIds={selectedCourseIds} 
        onToggle={toggleCourse}
        isUnlocked={(id: string) => isCourseUnlocked(id, selectedCourseIds, courses)}
        totalCredits={totalCredits}
      />
      <CurriculumStats 
        courses={courses} 
        selectedIds={selectedCourseIds}
        onRemove={removeCourse}
      />
    </div>
  );
}
