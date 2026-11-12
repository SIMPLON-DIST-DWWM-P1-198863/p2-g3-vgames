import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Jeu } from "../types/jeu";
import { getJeuParSlug } from "../services/getJeuParSlug";
import "../styles/GameDetailPage.css";

export default function GameDetailPage() {
  const { slug } = useParams();
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

  if (!charge) {
    return <p>Chargement...</p>;
  }

  if (!jeu) {
    return <p>Jeu introuvable</p>;
  }

  return (
    <div className="fiche-jeu">
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
      </div>
    </div>
  );
}
