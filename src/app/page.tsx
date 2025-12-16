import { getContent } from '@/lib/content';
import { Hero } from '@/components/home/Hero';
import { ResearchAreas } from '@/components/home/ResearchAreas';
import { LatestUpdates } from '@/components/home/LatestUpdates';
import { FacultyPreview } from '@/components/home/FacultyPreview';

export default function Home() {
  const homeData = getContent<any>('home');
  const newsData = getContent<any[]>('news');
  const peopleData = getContent<any>('people');

  return (
    <>
      <Hero 
        data={homeData.hero} 
        ticker_items={homeData.ticker} 
      />
      <ResearchAreas 
        data={homeData.research_areas} 
      />
      <LatestUpdates 
        data={homeData.latest_updates} 
        news={newsData} 
      />
      <FacultyPreview 
        data={homeData.faculty_preview} 
        faculty={peopleData.faculty} 
        students={peopleData.students} 
      />
    </>
  );
}
