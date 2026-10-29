import type { Jeu } from "../types/jeu";
import "../styles/gameCard.css";

interface GameCardProps {
  jeu: Jeu;
  onClick?: (jeu: Jeu) => void;
}

export default function GameCard({ jeu, onClick }: GameCardProps) {
  const annee = new Date(jeu.release_date).getFullYear();

  const prix =
    jeu.price === 0
      ? "Gratuit"
      : jeu.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

  return (
    <article
  className="game-card"
  onClick={() => onClick?.(jeu)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(jeu);
    }
  }}
  role="button"
  tabIndex={0}>
      <div className="game-card__image-wrapper">
        <img
          className="game-card__image"
          src={jeu.image}
          alt={`Jaquette de ${jeu.title}`}
          loading="lazy"
        />
        <span className="game-card__rating">{jeu.rating}</span>
      </div>

      <div className="game-card__content">
        <h3 className="game-card__title">{jeu.title}</h3>

        <p className="game-card__meta">
          {jeu.genre} · {annee}
        </p>

        <ul className="game-card__platforms">
          {jeu.platforms.map((plateforme) => (
            <li key={plateforme} className="game-card__platform">
              {plateforme}
            </li>
          ))}
        </ul>

        <p className="game-card__price">{prix}</p>
      </div>
    </article>
  );
}