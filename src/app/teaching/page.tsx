import { getContent } from '@/lib/content';
import { Hero } from '@/components/teaching/Hero';
import { CourseInteractions } from '@/components/teaching/CourseInteractions';
import { DegreePrograms } from '@/components/teaching/DegreePrograms';
import { CourseCatalog } from '@/components/teaching/CourseCatalog';

import { getAllDegreePrograms } from '@/lib/degreeProgramUtils';
import { SHOW_COURSE_TREE, SHOW_FULL_COURSE_CATALOG } from '@/lib/flags';

export default function TeachingPage() {
  const data = getContent<any>('teaching');
  const degreePrograms = getAllDegreePrograms();

  return (
    <>
      <Hero data={data.hero} />
      {SHOW_COURSE_TREE && (
        <div className="hidden md:block">
          <CourseInteractions courses={data.courses} />
        </div>
      )}
      <DegreePrograms programs={degreePrograms} />
      {SHOW_FULL_COURSE_CATALOG ? (
        <CourseCatalog courses={data.courses} filters={data.catalog_filters} />
      ) : (
        <section className="px-4 md:px-10 py-12 bg-white dark:bg-background-dark">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-6">Full Course Catalog</h2>
            <div className="bg-[#f5f5f0] dark:bg-white/5 rounded-xl p-8 border border-[#e6e6db] dark:border-white/10 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">school</span>
              <p className="text-text-main dark:text-white text-lg max-w-2xl mb-6">
                The full course catalog is available on the official University of Colorado classes website. 
                You can find AI-related courses by searching for <span className="font-semibold">"Artificial Intelligence"</span>.
              </p>
              <a 
                href="https://classes.colorado.edu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-text-main font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                View Classes on classes.colorado.edu
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
