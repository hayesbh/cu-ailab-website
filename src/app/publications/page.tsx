import { getContent } from "@/lib/content";
import { PublicationsContent } from "@/types/content";
import { PublicationsClient } from "./PublicationsClient";
import { notFound } from "next/navigation";
import { SHOW_PUBLICATIONS } from "@/lib/flags";

export default function PublicationsPage() {
  if (!SHOW_PUBLICATIONS) {
    return notFound();
  }
  const publicationsData = getContent<PublicationsContent>("publications");

  // Load additional publications from linked sources
  if (publicationsData.sources) {
    publicationsData.sources.forEach((source) => {
      try {
        const sourceData = getContent<PublicationsContent>(source);
        if (sourceData.publications) {
          publicationsData.publications.push(...sourceData.publications);
        }
      } catch (error) {
        console.error(`Error loading publication source: ${source}`, error);
      }
    });
  }

  return <PublicationsClient data={publicationsData} />;
}
