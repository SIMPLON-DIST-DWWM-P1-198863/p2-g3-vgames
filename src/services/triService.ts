import type { Jeu } from "../types/jeu";

export type CritereTri = "titre" | "annee" | "prix";

export function trierJeux(jeux: Jeu[], critere: string): Jeu[] {
  const copie = [...jeux];

  switch (critere) {
    case "titre":
      return copie.sort((a, b) => a.title.localeCompare(b.title));
    case "annee":
      return copie.sort((a, b) => b.release_date.localeCompare(a.release_date));
    case "prix":
      return copie.sort((a, b) => a.price - b.price);
    default:
      return copie;
  }
}
