import { getContent } from '@/lib/content';
import { Hero } from '@/components/teaching/Hero';
import { CourseInteractions } from '@/components/teaching/CourseInteractions';
import { DegreePrograms } from '@/components/teaching/DegreePrograms';
import { CourseCatalog } from '@/components/teaching/CourseCatalog';

export default function TeachingPage() {
  const data = getContent<any>('teaching');

  return (
    <>
      <Hero data={data.hero} />
      <div className="hidden md:block">
        <CourseInteractions courses={data.courses} />
      </div>
      <DegreePrograms programs={data.degree_programs} />
      <CourseCatalog courses={data.courses} filters={data.catalog_filters} />
    </>
  );
}
