export interface HeroStats {
  value: string;
  label: string;
}

export interface ResearchHero {
  title: string;
  description: string;
  stats: HeroStats[];
}

export interface ResearchProject {
  title: string;
  category?: string;
  categories?: string[]; // Handle both single and multiple categories
  description: string;
  image: string;
  external_url: string;
  status?: string;
  featured?: boolean;
}

export interface FundingSource {
  name: string;
  logo?: string; // Optional if we just use text for now as in the example
}

export interface ResearchPageContent {
  hero: ResearchHero;
  filters: {
    categories: string[];
  };
  funding_logos: FundingSource[];
}

export interface PublicationLink {
  pdf?: string;
  code?: string;
  data?: string;
}

export interface VenueStat {
  label: string;
  count: number;
}

export interface NetworkNode {
  id: string;
  group: string;
  x: number;
  y: number;
}

export interface NetworkLink {
  source: string;
  target: string;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export interface Publication {
  title: string;
  venue: string;
  year?: string; // e.g. "2024"
  month?: string; // e.g. "June"
  award?: string;
  authors: string; 
  links: PublicationLink;
  abstract?: string;
}

export interface PublicationsContent {
  stats: {
    venue_distribution: VenueStat[];
  };
  network: NetworkData;
  publications: Publication[];
}
