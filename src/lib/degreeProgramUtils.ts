import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const degreeProgramsDirectory = path.join(process.cwd(), 'src/content/degree-programs');

export interface DegreeProgramData {
  slug: string;
  frontmatter: DegreeProgramFrontmatter;
  content: string;
}

export interface DegreeProgramFrontmatter {
  title: string;
  description: string;
  type: 'light' | 'dark';
  icon: string;
  features?: string[];
  link_text?: string;
  link_url?: string;
  order?: number;
  hero?: {
    image: string;
    image_alt?: string;
    subtitle?: string;
  };
  curriculum?: {
    core: Array<{
      code: string;
      title: string;
      description: string;
    }>;
    electives: Array<{
       code: string;
       title: string;
    }>;
  };
  requirements?: Array<{
    title: string;
    description: string;
  }>;
  timeline?: Array<{
    title: string;
    subtitle?: string;
    items: string[];
  }>;
  quick_facts?: {
    duration: string;
    credits: string;
    format: string;
    next_deadline?: string;
  };
  contact?: {
    name: string;
    role: string;
    email: string;
    image: string;
  };
  admissions?: { // Keeping for backward compat or if needed
    application_link: string;
    deadlines: Array<{
      semester: string;
      date: string;
    }>;
  };
  [key: string]: any;
}

export function getAllDegreePrograms() {
  const fileNames = fs.readdirSync(degreeProgramsDirectory);
  const allPrograms = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(degreeProgramsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as DegreeProgramFrontmatter),
    };
  });

  return allPrograms.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getDegreeProgram(slug: string): DegreeProgramData {
  const fullPath = path.join(degreeProgramsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as DegreeProgramFrontmatter,
    content,
  };
}
