import { getContent } from "@/lib/content";
import { PublicationsContent } from "@/types/content";
import { PublicationsClient } from "./PublicationsClient";

export default function PublicationsPage() {
  const publicationsData = getContent<PublicationsContent>("publications");

  return <PublicationsClient data={publicationsData} />;
}
