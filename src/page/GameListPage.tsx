import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getJeux } from "../services/jeuxService";
import { type CritereTri } from "../services/triService";
import type { Jeu } from "../types/jeu";
import GameCard from "../components/GameCard";
import "../styles/GameListPage.css";
import Pagination from "../components/Pagination";
import TriJeux from "../components/TriJeux";
import { paginer } from "../utils/pagination";
import "../styles/GameListPage.css";
import FiltrePlateformes from "../components/FiltrePlateformes";
import { useJeuxFiltres } from "../hooks/useJeuxFiltres";

const JEUX_PAR_PAGE = 12;

export default function GameListPage() {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const critere = (searchParams.get("tri") as CritereTri) || "titre";
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    getJeux()
      .then((data) => setJeux(data))
      .catch(() => setErreur("Impossible de charger les jeux."))
      .finally(() => setChargement(false));
  }, []);


  const changerTri = (nouveauCritere: CritereTri) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tri", nouveauCritere);
      params.set("page", "1");
      return params;
    });
  };

  const jeuxFiltres = jeux.filter(
    (jeu) =>
      jeu.title.toLowerCase().includes(searchQuery) ||
      jeu.genre.toLowerCase().includes(searchQuery),
  );

  const jeuxTries = trierJeux(jeuxFiltres, critere);

  const pageDemandee = Math.floor(Number(searchParams.get("page"))) || 1;
  const totalPagesMax = Math.max(
    Math.ceil(jeuxTries.length / JEUX_PAR_PAGE),
    1,
  );
  const pageCourante = Math.min(Math.max(pageDemandee, 1), totalPagesMax);

  const { elements, totalPages } = paginer(
    jeuxTries,
    pageCourante,
    JEUX_PAR_PAGE,
  );
  return (
    <main className="game-list-page">
      <header className="game-list-page__header">
        <h1 className="game-list-page__title">Liste des jeux</h1>

        {!chargement && !erreur && (
          <p className="game-list-pagecount">
            {jeuxTries.length} {jeuxTries.length > 1 ? "jeux" : "jeu"}
          </p>
        )}
        <FiltrePlateformes
          plateformes={plateformesDisponibles}
          cochees={plateformesCochees}
          onToggle={basculerPlateforme}
        />

        <TriJeux critere={critere} onChangeTri={changerTri} />
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
          <section
            className="game-list-page__grid"
            aria-label="Catalogue des jeux"
          >
            {elements.map((jeu) => (
              <GameCard key={jeu.id} jeu={jeu} />
            ))}
          </section>

          <Pagination pageCourante={pageCourante} totalPages={totalPages} />
        </>
      )}
    </main>
  );
}
