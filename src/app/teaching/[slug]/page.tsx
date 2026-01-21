
import React from 'react';
import { getAllDegreePrograms, getDegreeProgram } from '@/lib/degreeProgramUtils';
import { notFound } from 'next/navigation';
import { DegreeProgramDetails } from '@/components/teaching/DegreeProgramDetails';

export async function generateStaticParams() {
  const programs = getAllDegreePrograms();
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default async function DegreeProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let programData;
  try {
     programData = getDegreeProgram(slug);
  } catch (e) {
     notFound();
  }

  const { frontmatter, content } = programData;

  // Use default hero if not provided
  const heroImage = frontmatter.hero?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDqa12QX-QB7H0ru-RxEYN2dS7DECsxopcCNf0sjChWRj7myDKCRwosvk17ugP1V1WeR-u2maHGsYb9OWEyi3Ds4tQMPwnDiTGrVahtABySmEWSE7iQivlywNEgplYjPOhNDnLICZXQ996POVDn6Zenxr3KKIgT6i3HMbzC70Oi4y3jNhqmHQ7MbAzNXjWAOpzcn-a0INBK7dtnInXhQmCLS8csANDZCOyLplqcwnoG9ZRoDkzVzpsQgJaeGiL-JfaILWM3rAI7jEo";
  const heroSubtitle = frontmatter.hero?.subtitle || "College of Engineering & Applied Science • Department of Computer Science";

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#181611] dark:text-white">
      {/* Hero Section */}
      <div className="relative w-full">
        <div 
          className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-10 md:px-40 py-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("${heroImage}")`
          }}
        >
          <div className="flex flex-col gap-4 text-left max-w-[960px] w-full mx-auto animate-fade-in-up">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Graduate Degree</span>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
              {frontmatter.title}
            </h1>
            <h2 className="text-white/90 text-lg md:text-xl font-normal leading-normal max-w-2xl">
              {heroSubtitle}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper - Client Component */}
      <DegreeProgramDetails frontmatter={frontmatter} content={content} />
    </div>
  );
}
