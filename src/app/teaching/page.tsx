import { getContent } from '@/lib/content';
import { Hero } from '@/components/teaching/Hero';
import { CourseInteractions } from '@/components/teaching/CourseInteractions';
import { DegreePrograms } from '@/components/teaching/DegreePrograms';
import { CourseCatalog } from '@/components/teaching/CourseCatalog';

import { getAllDegreePrograms } from '@/lib/degreeProgramUtils';
import { SHOW_COURSE_TREE } from '@/lib/flags';

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
      <CourseCatalog courses={data.courses} filters={data.catalog_filters} />
    </>
  );
}
