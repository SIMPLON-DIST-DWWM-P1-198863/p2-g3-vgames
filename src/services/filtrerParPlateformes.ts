import type { Jeu } from "../types/jeu";

export function filtrerParPlateformes(
  jeux: Jeu[],
  plateformes: string[],
): Jeu[] {
  if (plateformes.length === 0) return jeux;
  return jeux.filter((jeu) =>
    jeu.platforms.some((p) => plateformes.includes(p)),
  );
}
