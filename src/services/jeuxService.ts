import jeuxData from "../data/jeux.json";
import type { Jeu } from "../types/jeu";

export async function getJeux(): Promise<Jeu[]> {
  return jeuxData as Jeu[];
}

export async function getJeuById(id: number): Promise<Jeu | undefined> {
  return (jeuxData as Jeu[]).find((jeu) => jeu.id === id);
}