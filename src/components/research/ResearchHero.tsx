import { ResearchHero as ResearchHeroType } from '@/types/content';

interface ResearchHeroProps {
  data: ResearchHeroType;
}

export function ResearchHero({ data }: ResearchHeroProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#e5e5dc] dark:border-[#3a3928]">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight dark:text-white">
          {data.title}
        </h2>
        <p className="text-lg md:text-xl text-text-sub dark:text-gray-400 font-normal leading-relaxed max-w-xl">
          {data.description}
        </p>
      </div>
      
      {/* Stats */}
      <div className="flex gap-6 md:gap-12 self-start md:self-end pt-4 md:pt-0">
        {data.stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-3xl md:text-4xl font-bold dark:text-white">{stat.value}</span>
            <span className="text-sm text-text-sub dark:text-gray-500 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
