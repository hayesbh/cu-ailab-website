import { withBasePath } from '@/lib/paths';
import Link from 'next/link';
import { SHOW_PUBLICATIONS } from '@/lib/flags';

export function Footer() {
  return (
    <footer className="bg-black dark:bg-card-dark text-white pt-20 pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-black">
                <span className="material-symbols-outlined text-[18px]">bubble_chart</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Colorado AI Lab</h2>
            </div>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              University of Colorado Boulder<br />
              Engineering Center<br />
              Boulder, CO 80309
            </p>
            <div className="flex gap-4">
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-lg text-white">Research</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {[
                'Human-AI Teaming',
                'Computer Vision',
                'Natural Language Processing',
                'Robotics',
                'Geospatial AI',
              ].map((item) => (
                <li key={item}>
                  <Link href={withBasePath("/research")} className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-lg text-white">Contact</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Prof. Brad Hayes<br />
              <a
                href="mailto:bradley.hayes@colorado.edu"
                className="hover:text-primary transition-colors"
              >
                bradley.hayes@colorado.edu
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} University of Colorado Boulder</p>
          <div className="flex gap-6">

          </div>
        </div>
      </div>
    </footer>
  );
}
