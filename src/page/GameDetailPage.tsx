import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Jeu } from "../types/jeu";
import { getJeuParSlug } from "../services/getJeuParSlug";
import "../styles/GameDetailPage.css";

export default function GameDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [jeu, setJeu] = useState<Jeu>();
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    if (slug) {
      getJeuParSlug(slug).then((resultat) => {
        setJeu(resultat);
        setCharge(true);
      });
    }
  }, [slug]);

  // Revient à la page précédente (avec recherche, filtres et pagination conservés).
  // Si on est arrivé directement sur la fiche, on retourne à l'accueil.
  function retour() {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  if (!charge) {
    return <p>Chargement...</p>;
  }

  if (!jeu) {
    return <p>Jeu introuvable</p>;
  }

  return (
    <div className="fiche-jeu">
      <button
        type="button"
        className="btn btn--secondaire fiche-jeu__retour"
        onClick={retour}
      >
        ← Retour
      </button>
      <img src={jeu.image} alt={jeu.title} />
      <div>
        <h1>{jeu.title}</h1>
        <p>{jeu.description}</p>
        <p>Genre : {jeu.genre}</p>
        <p>Plateformes : {jeu.platforms.join(", ")}</p>
        <p>Date de sortie : {jeu.release_date}</p>
        <p>Développeur : {jeu.developer}</p>
        <p>Éditeur : {jeu.publisher}</p>
        <p>Note : {jeu.rating}</p>
        <p>Prix : {jeu.price}</p>

        {/* Le panier n'est pas encore branché : le bouton ne fait rien pour l'instant */}
        <button type="button" className="btn btn--principal">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}