import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-background-light/95 dark:bg-background-dark/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-white dark:bg-primary dark:text-text-main group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">bubble_chart</span>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight leading-none text-text-main dark:text-text-light">
                AI@CUBoulder
              </h2>
              <p className="text-xs font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-wide">
                University of Colorado Boulder
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {['Research', 'People', 'Publications', 'Teaching'].map((item) => (
            <Link
              key={item}
              href={'/'+item.toLowerCase()}
              className="text-sm font-bold text-text-main dark:text-text-light hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/join-us"
            className="hidden sm:flex h-10 items-center justify-center rounded bg-black dark:bg-primary px-6 text-sm font-bold text-white dark:text-text-main hover:bg-gray-800 dark:hover:bg-primary-hover transition-all shadow-md hover:shadow-lg"
          >
            Join Us
          </Link>
          <button className="lg:hidden p-2 text-text-main dark:text-text-light hover:text-primary transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
