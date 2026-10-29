import { useEffect, useState } from "react";
import { getJeux } from "../services/jeuxService";
import type { Jeu } from "../types/jeu";
import GameCard from "../components/GameCard";
import "../styles/GameListPage.css";

export default function GameListPage() {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    getJeux()
      .then((data) => setJeux(data))
      .catch(() => setErreur("Impossible de charger les jeux."))
      .finally(() => setChargement(false));
  }, []);

  const handleCardClick = (jeu: Jeu) => {
  console.log("Carte cliquée :", jeu.title);
};

  return (
    <main className="game-list-page">
      <header className="game-list-page__header">
        <h1 className="game-list-page__title">Liste des jeux</h1>
        {!chargement && !erreur && (
          <p className="game-list-page__count">
            {jeux.length} {jeux.length > 1 ? "jeux" : "jeu"}
          </p>
        )}
      </header>

      {chargement && <p className="game-list-page__message">Chargement des jeux…</p>}

      {erreur && <p className="game-list-page__message game-list-page__message--error">{erreur}</p>}

      {!chargement && !erreur && jeux.length === 0 && (
        <p className="game-list-page__message">Aucun jeu pour le moment.</p>
      )}

      {!chargement && !erreur && jeux.length > 0 && (
        <section className="game-list-page__grid" aria-label="Catalogue des jeux">
          {jeux.map((jeu) => (
            <GameCard key={jeu.id} jeu={jeu} onClick={handleCardClick} />
          ))}
        </section>
      )}
    </main>
  );
}