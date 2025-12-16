import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getContent<T>(filename: string): T {
  const fullPath = path.join(contentDirectory, `${filename}.yaml`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return yaml.load(fileContents) as T;
}
