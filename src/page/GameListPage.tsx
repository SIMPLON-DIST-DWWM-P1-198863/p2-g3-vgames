import { useEffect, useState } from "react";
import { getJeux } from "../services/jeuxService";
import type { Jeu } from "../types/jeu";
import GameCard from "../components/GameCard";
import "../styles/GameListPage.css";
import Pagination from "../components/Pagination";
import { paginer } from "../utils/pagination";
import { useSearchParams } from "react-router-dom";

  const JEUX_PAR_PAGE = 12;

export default function GameListPage() {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getJeux()
      .then((data) => setJeux(data))
      .catch(() => setErreur("Impossible de charger les jeux."))
      .finally(() => setChargement(false));
  }, []);

  const handleCardClick = (jeu: Jeu) => {
    console.log("Carte cliquée :", jeu.title);
  };

  const changerTri = (nouveauCritere: CritereTri) => {
    setSearchParams({ tri: nouveauCritere });
  };
  const jeuxTries = trierJeux(jeux, critere);

  const pageDemandee = Math.floor(Number(searchParams.get("page"))) || 1;
  const totalPagesMax = Math.max(Math.ceil(jeux.length / JEUX_PAR_PAGE), 1);
  const pageCourante = Math.min(Math.max(pageDemandee, 1), totalPagesMax);
  
  const {elements, totalPages } = paginer(jeux, pageCourante, JEUX_PAR_PAGE);

  return (
   
    <main className="game-list-page">
      <header className="game-list-pageheader">
        <h1 className="game-list-pagetitle">Liste des jeux</h1>
        {!chargement && !erreur && (
          <p className="game-list-page__count">
            {jeux.length} {jeux.length > 1 ? "jeux" : "jeu"}
          </p>
        )}

        <label className="game-list-page__sort">
          Trier par :{" "}
          <select
            value={critere}
            onChange={(e) => changerTri(e.target.value as CritereTri)}
          >
            <option value="titre">Titre (A-Z)</option>
            <option value="annee">Année</option>
            <option value="prix">Prix</option>
          </select>
        </label>
      </header>

      {chargement && (
        <p className="game-list-page__message">Chargement des jeux…</p>
      )}

      {erreur && (
        <p className="game-list-page__message game-list-page__message--error">
          {erreur}
        </p>
      )}

      {!chargement && !erreur && jeux.length === 0 && (
        <p className="game-list-page__message">Aucun jeu pour le moment.</p>
      )}

      {!chargement && !erreur && jeux.length > 0 && (
         <>
        <section className="game-list-page__grid" aria-label="Catalogue des jeux">
          {elements.map((jeu) => (
            <GameCard key={jeu.id} jeu={jeu} onClick={handleCardClick} />
          ))}
        </section>

        <Pagination pageCourante={pageCourante} totalPages={totalPages} />
    
    </>
     )}
     </main>
  );
}
