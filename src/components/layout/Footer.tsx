import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black dark:bg-card-dark text-white pt-20 pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
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
              {['share', 'mail'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-black transition-colors text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-lg text-white">Research</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {[
                'Computer Vision',
                'Natural Language Processing',
                'Robotics',
                'Machine Learning',
                'AI for Climate Science',
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-lg text-white">Group</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {['People', 'Publications', 'News', 'Courses', 'Join Us'].map((item) => (
                <li key={item}>
                  <Link href={item === 'People' ? '/people' : '#'} className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-lg text-white">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest research and events.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded border-gray-700 bg-gray-900 px-4 py-2 text-sm focus:border-primary focus:ring-primary text-white transition-all"
              />
              <button className="w-full rounded bg-primary px-4 py-2 text-sm font-bold text-black hover:bg-primary-hover transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} University of Colorado Boulder</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map((item) => (
              <Link key={item} href="#" className="hover:text-primary transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
