import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FiltrePlateformes from "../components/FiltrePlateformes";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";
import TriJeux from "../components/TriJeux";

import { getJeux } from "../services/jeuxService";
import { trierJeux, type CritereTri } from "../services/triService";
import { paginer } from "../utils/pagination";

import type { Jeu } from "../types/jeu";

import "../styles/gameListPage.css";

const JEUX_PAR_PAGE = 12;

export default function GameListPage() {
  // --- État ---
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [plateformesCochees, setPlateformesCochees] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Paramètres d'URL ---
  const critere = (searchParams.get("tri") as CritereTri) || "titre";
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // --- Chargement des données ---
  useEffect(() => {
    getJeux()
      .then((data) => setJeux(data))
      .catch(() => setErreur("Impossible de charger les jeux."))
      .finally(() => setChargement(false));
  }, []);

  // --- Actions ---
  const changerTri = (nouveauCritere: CritereTri) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tri", nouveauCritere);
      params.set("page", "1");
      return params;
    });
  };

  const changerPage = (nouvellePage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(nouvellePage));
      return params;
    });
  };

  const basculerPlateforme = (plateforme: string) => {
    setPlateformesCochees((prev) =>
      prev.includes(plateforme)
        ? prev.filter((p) => p !== plateforme)
        : [...prev, plateforme],
    );
    changerPage(1); // on revient à la page 1 quand le filtre change
  };

  // --- Données dérivées ---
  const plateformesDisponibles = [...new Set(jeux.flatMap((jeu) => jeu.platforms))].sort();

  // 1. Filtrer (recherche + plateformes)
  const jeuxFiltres = jeux.filter((jeu) => {
    const correspondRecherche =
      jeu.title.toLowerCase().includes(searchQuery) ||
      jeu.genre.toLowerCase().includes(searchQuery);

    const correspondPlateforme =
      plateformesCochees.length === 0 || plateformesCochees.some((p) => jeu.platforms.includes(p));

    return correspondRecherche && correspondPlateforme;
  });

  // 2. Trier
  const jeuxTries = trierJeux(jeuxFiltres, critere);

  // 3. Paginer
  const pageDemandee = Math.floor(Number(searchParams.get("page"))) || 1;
  const totalPagesMax = Math.max(Math.ceil(jeuxTries.length / JEUX_PAR_PAGE), 1);
  const pageCourante = Math.min(Math.max(pageDemandee, 1), totalPagesMax);

  const { elements, totalPages } = paginer(jeuxTries, pageCourante, JEUX_PAR_PAGE);

  // --- Rendu ---
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

      {erreur && <p className="game-list-page__message">{erreur}</p>}

      {!chargement && !erreur && jeuxTries.length === 0 && (
        <p className="game-list-page__message">Aucun jeu ne correspond à ta recherche.</p>
      )}

      {!chargement && !erreur && jeuxTries.length > 0 && (
        <>
          <section className="game-list-page__grid">
            {elements.map((jeu) => (
              <GameCard key={jeu.id} jeu={jeu} />
            ))}
          </section>

          <Pagination
            pageCourante={pageCourante}
            totalPages={totalPages}
          />
        </>
      )}
    </main>
  );
}