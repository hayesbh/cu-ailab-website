import { FundingSource } from '@/types/content';

interface FundingSupportProps {
  logos: FundingSource[];
}

export function FundingSupport({ logos }: FundingSupportProps) {
  return (
    <section className="py-12 border-t border-[#e5e5dc] dark:border-[#3a3928]">
      <p className="text-center text-sm font-bold text-text-sub dark:text-gray-500 uppercase tracking-widest mb-8">
        Research Supported By
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        {logos.map((logo, index) => (
          <div key={index} className="h-8 flex items-center justify-center font-black text-xl text-gray-400 dark:text-gray-600">
             {/* If we had logo images, we'd use them here. For now, text fallback as per example. */}
             {logo.name}
          </div>
        ))}
      </div>
    </section>
  );
}
