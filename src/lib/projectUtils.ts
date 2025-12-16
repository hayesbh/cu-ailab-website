import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export interface ProjectData {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface ProjectFrontmatter {
  title: string;
  subtitle?: string;
  status: string;
  categories: string[];
  hero_image?: string;
  duration?: string;
  funding?: string;
  team?: {
    pis?: Array<{
      name: string;
      role: string;
      department?: string;
      initials?: string;
    }>;
    researchers?: Array<{
      name: string;
      role: string;
    }>;
  };
  topics?: string[];
  related_publications?: Array<{
    title: string;
    venue: string;
    authors: string;
    year?: string;
  }>;
  [key: string]: any;
}

export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getProjectData(slug: string): ProjectData {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}
