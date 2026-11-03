import type { Jeu } from "../types/jeu";
export function recherche(jeux: Jeu[], texte: string): Jeu[] {
const recherche = texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

return jeux.filter((jeu) => {
const titre = jeu.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
return titre.includes(recherche);

});
}