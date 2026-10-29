import type { Jeu } from "../types/jeu";

const API_URL = "https://materiel-apprentissage.github.io/api/video-games.json";

export async function getJeux(): Promise<Jeu[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Erreur ${res.status} lors du chargement des jeux`);
  }
  return res.json();
}

export async function getJeuById(id: number): Promise<Jeu | undefined> {
  const jeux = await getJeux();
  return jeux.find((jeu) => jeu.id === id);
}