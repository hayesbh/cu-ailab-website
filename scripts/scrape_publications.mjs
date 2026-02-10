import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '../src/content/publications/faculty_config.yaml');
const OUTPUT_DIR = path.join(__dirname, '../src/content/publications');

async function fetchPublicationsXml(pid) {
  const url = `https://dblp.org/pid/${pid}.xml`;
  console.log(`Fetching ${url}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return await response.text();
}

function extractTagContent(xmlSnippet, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)</${tagName}>`, 's');
  const match = xmlSnippet.match(regex);
  return match ? match[1].trim() : null;
}

function extractAllTags(xmlSnippet, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)</${tagName}>`, 'gs');
  const matches = [...xmlSnippet.matchAll(regex)];
  return matches.map(m => m[1].trim());
}

function parseXmlPublications(xmlData, facultyName) {
  const publications = [];
  
  // Split by <r> tags to get individual entries
  const entryRegex = /<r>(.*?)<\/r>/gs;
  const entries = [...xmlData.matchAll(entryRegex)];

  for (const match of entries) {
    const entryXml = match[1];
    
    // Determine type (article, inproceedings, etc.)
    // We look for the first tag inside <r> which is usually the type
    const typeMatch = entryXml.match(/<(\w+) key="/);
    const type = typeMatch ? typeMatch[1] : 'unknown';

    // Map fields
    const title = extractTagContent(entryXml, 'title');
    const year = extractTagContent(entryXml, 'year');
    const month = extractTagContent(entryXml, 'month');
    const venue = extractTagContent(entryXml, 'journal') || extractTagContent(entryXml, 'booktitle') || extractTagContent(entryXml, 'school') || "Unknown Venue";
    const ee = extractTagContent(entryXml, 'ee');
    
    const authorsList = extractAllTags(entryXml, 'author');
    let authorsStr = authorsList.join(", ");

    // Bold the faculty name - REMOVED per user request
    // if (authorsStr.toLowerCase().includes(facultyName.toLowerCase())) {
    //     const nameRegex = new RegExp(facultyName, 'gi');
    //     authorsStr = authorsStr.replace(nameRegex, `**${facultyName}**`);
    // }

    const entry = {
      title: title,
      venue: venue,
      year: year,
      authors: authorsStr,
      links: {}
    };

    if (ee) {
      entry.links.pdf = ee;
    }
    
    if (month) {
      entry.month = month;
    }

    publications.push(entry);
  }
  
  return publications;
}

async function main() {
  try {
    const configContent = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = yaml.load(configContent);

    for (const faculty of config) {
      console.log(`Processing ${faculty.name}...`);
      try {
        const xmlData = await fetchPublicationsXml(faculty.dblp_pid);
        const publications = parseXmlPublications(xmlData, faculty.name);
        
        // Sort by year descending? DBLP usually returns sorted but good to ensure.
        // Actually DBLP returns newest first usually? Or we can sort.
        // Let's sort descending by year.
        publications.sort((a, b) => (b.year || 0) - (a.year || 0));

        const outputData = { publications };
        const outputContent = yaml.dump(outputData, { lineWidth: -1, quotingType: '"' });
        const outputPath = path.join(OUTPUT_DIR, faculty.output_file);
        
        fs.writeFileSync(outputPath, outputContent);
        console.log(`Wrote ${publications.length} publications to ${faculty.output_file}`);
      } catch (err) {
        console.error(`Error processing ${faculty.name}:`, err);
      }
    }
  } catch (err) {
    console.error("Error reading config or executing script:", err);
  }
}

main();
