import { VenueStat } from '@/types/content';

interface PublicationStatsProps {
  stats: VenueStat[];
}

export function PublicationStats({ stats }: PublicationStatsProps) {
  // Find max count to normalize bar widths
  const maxCount = Math.max(...stats.map(s => s.count));

  return (
    <div className="bg-white dark:bg-[#181811] rounded-[2rem] p-6 md:p-8 shadow-sm border border-[#e5e5dc] dark:border-[#3a3928] flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
        <h3 className="font-bold text-lg text-text-main dark:text-white">Publication Distribution by Venue</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary"></span>
            <span className="text-xs font-medium text-text-sub">Count</span>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        {stats.map((stat, index) => {
          const widthPercentage = Math.round((stat.count / maxCount) * 85); // Scaling to max ~85% width
          return (
            <div key={index} className="flex items-center gap-4 text-sm font-medium">
              <div className="w-16 text-text-sub dark:text-gray-400 shrink-0 font-bold">{stat.label}</div>
              <div className="flex-1 h-8 bg-background-light dark:bg-[#2a2916] rounded-full overflow-hidden relative group">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 group-hover:bg-[#fcf832]" 
                  style={{ width: `${widthPercentage}%` }}
                ></div>
                <span className="absolute inset-y-0 right-3 flex items-center text-xs font-bold text-text-main dark:text-white">{stat.count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
