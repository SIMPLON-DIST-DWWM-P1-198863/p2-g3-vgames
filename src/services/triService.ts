import type { Jeu } from "../types/jeu";

export type CritereTri = "titre" | "annee" | "prix";

export function trierJeux(jeux: Jeu[], critere: CritereTri): Jeu[] {
  const copie = [...jeux]; // sort() modifie le tableau d'origine : on trie une copie

  switch (critere) {
    case "titre":
      return copie.sort((a, b) => a.title.localeCompare(b.title));
    case "annee":
      // plus récent d'abord — adapte le champ (release_date, year…) à ton type Jeu
      return copie.sort(
        (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
      );
    case "prix":
      // moins cher d'abord — adapte le champ à ton type Jeu
      return copie.sort((a, b) => a.price - b.price);
    default:
      return copie;
  }
}
