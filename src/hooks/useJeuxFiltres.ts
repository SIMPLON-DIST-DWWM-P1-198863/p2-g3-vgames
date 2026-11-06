import type { Jeu } from "../types/jeu";
import { recherche } from "../services/recherche";
import { filtrerParPlateformes } from "../services/filtrerParPlateformes";
import { trierJeux } from "../services/triService";

export function useJeuxFiltres(
  jeux: Jeu[],
  texte: string,
  plateformes: string[],
  critere: string,
): Jeu[] {
  const trouves = texte ? recherche(jeux, texte) : jeux;
  const filtres = filtrerParPlateformes(trouves, plateformes);
  return trierJeux(filtres, critere);
}
