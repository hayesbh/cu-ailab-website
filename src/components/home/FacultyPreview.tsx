import Link from 'next/link';

interface Person {
  name: string;
  role: string;
  image: string;
  link: string;
}

interface FacultyPreviewProps {
  data: {
    title: string;
    subtitle: string;
    cta: string;
  };
  faculty: Person[];
}

export function FacultyPreview({ data, faculty }: FacultyPreviewProps) {
  // Shuffle faculty and take 5
  const previewPeople = [...(faculty || [])]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <section className="bg-background-light dark:bg-background-dark py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-black dark:text-white">{data.title}</h2>
            <p className="text-lg text-text-muted dark:text-text-muted-dark">
              {data.subtitle}
            </p>
          </div>
          <Link href="/people" className="h-10 px-6 rounded bg-primary text-black flex items-center justify-center text-sm font-bold hover:bg-primary-hover transition-colors">
            {data.cta}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
          {previewPeople.map((person, index) => (
            <div key={index} className="flex flex-col items-start gap-4 group cursor-pointer">
              <div className="relative w-full aspect-square rounded overflow-hidden bg-gray-200">
                <img
                  src={person.image}
                  alt={`Portrait of ${person.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors text-black dark:text-white">
                  {person.name}
                </h4>
                <p className="text-sm text-text-muted dark:text-text-muted-dark mt-1">{person.role}</p>
              </div>
            </div>
          ))}

          <Link href="/join-us" className="flex flex-col items-start gap-4 group cursor-pointer">
            <div className="relative w-full aspect-square rounded overflow-hidden bg-gray-100 border-2 border-dashed border-border-light dark:border-border-dark flex items-center justify-center group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-4xl text-text-muted opacity-50 group-hover:text-primary group-hover:opacity-100 transition-all">add</span>
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors text-black dark:text-white">You?</h4>
              <p className="text-sm text-text-muted dark:text-text-muted-dark mt-1">Join Colorado AI Lab</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
