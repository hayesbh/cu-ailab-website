import { getContent } from '@/lib/content';
import { PersonCard } from '@/components/shared/PersonCard';
import { PeopleBrowser } from '@/components/people/PeopleBrowser';
import Image from 'next/image';
import { withBasePath } from '@/lib/paths';

export default function PeoplePage() {
  const peopleData = getContent<any>('people');

  return (
    <div className="min-h-screen pt-24 pb-24">
       {/* Header */}
      <div className="relative bg-black text-white py-32 mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={withBasePath("/boulder-skyline.jpg")}
            alt="CU Boulder Skyline"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm mb-6">
              <span className="material-symbols-outlined text-[16px]">group</span>
              Faculty & Staff
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-6 text-white drop-shadow-sm">
              Meet the Team
            </h1>
            <p className="text-xl text-gray-200 font-light leading-relaxed drop-shadow-sm">
              Our diverse team of researchers, engineers, and students is dedicated to advancing the field of Artificial Intelligence.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <PeopleBrowser peopleData={peopleData || { faculty: [], students: [] }} />
      </div>
    </div>
  );
}
