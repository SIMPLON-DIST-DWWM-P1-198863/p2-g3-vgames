import type { Jeu } from "../types/jeu";
import { getJeux } from "./jeuxService";

export function slugify(titre: string): string {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getJeuParSlug(slug: string): Promise<Jeu | undefined> {
  const jeux = await getJeux();
  return jeux.find((jeu) => slugify(jeu.title) === slug);
}
