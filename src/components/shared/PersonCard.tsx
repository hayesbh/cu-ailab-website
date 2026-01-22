import Link from 'next/link';
import { withBasePath } from '@/lib/paths';

interface Person {
  name: string;
  role: string;
  image: string;
  link: string;
  interests?: string[];
}

interface PersonCardProps {
  person: Person;
  layout?: 'grid' | 'list';
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="flex flex-col items-start gap-4 group cursor-pointer h-full">
      <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-gray-200">
        <img
          src={withBasePath(person.image)}
          alt={`Portrait of ${person.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="w-full">
        {person.role.includes('Director') || person.role.includes('PI') || person.role.includes('Professor') ? (
            <span className="inline-block py-1 px-2 mb-2 text-[10px] font-bold tracking-wider uppercase bg-primary/20 text-primary-darker rounded">
                Faculty
            </span>
        ) : null}
        
        <h4 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors text-black dark:text-white">
          <Link href={person.link}>{person.name}</Link>
        </h4>
        <p className="text-sm text-text-muted dark:text-text-muted-dark mt-1 font-medium">{person.role}</p>
        
        {person.interests && (
            <div className="mt-3 flex flex-wrap gap-2">
                {person.interests.map((interest, i) => (
                    <span key={i} className="text-[10px] py-0.5 px-2 bg-background-alt dark:bg-card-dark border border-border-light dark:border-border-dark rounded text-text-muted dark:text-text-muted-dark font-medium">
                        {interest}
                    </span>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
