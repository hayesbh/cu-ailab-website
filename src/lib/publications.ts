import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { getContent } from './content';
import { PublicationsContent, Publication } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'src/content');

interface PublicationsBase extends Omit<PublicationsContent, 'publications'> {
  sources?: string[];
  publications?: Publication[];
}

interface PublicationSource {
  publications: Publication[];
}

export function getPublications(): PublicationsContent {
  // 1. Load the base publications.yaml file
  // Using generic type first since the shape on disk might differ from final shape
  const baseData = getContent<PublicationsBase>("publications");
  
  let allPublications: Publication[] = [];

  // 2. If there are inline publications (backward compatibility), add them
  if (baseData.publications) {
    allPublications = [...baseData.publications];
  }

  // 3. Load sourced files if they exist
  if (baseData.sources && Array.isArray(baseData.sources)) {
    baseData.sources.forEach(sourcePath => {
      try {
        // Construct full path to the source file
        // sourcePath should be relative to src/content, e.g., "publications/lastname.firstname.publications"
        // We handle extension check
        const fileName = sourcePath.endsWith('.yaml') ? sourcePath : `${sourcePath}.yaml`;
        const fullPath = path.join(contentDirectory, fileName);
        
        if (fs.existsSync(fullPath)) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const sourceData = yaml.load(fileContents) as PublicationSource;
          
          if (sourceData.publications) {
            allPublications = [...allPublications, ...sourceData.publications];
          }
        } else {
          console.warn(`Publications source file not found: ${fullPath}`);
        }
      } catch (error) {
        console.error(`Error loading publication source ${sourcePath}:`, error);
      }
    });
  }

  // 4. Return the aggregated content
  return {
    ...baseData,
    publications: allPublications
  };
}
