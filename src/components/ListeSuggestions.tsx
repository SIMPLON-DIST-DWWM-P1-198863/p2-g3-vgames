import type { Jeu } from "../types/jeu";
import "../styles/ListSuggestions.css";

type Props = {
  recherche: string;
  suggestions: Jeu[];
  indexActif: number;
};

export default function ListSuggestions({
  recherche,
  suggestions,
  indexActif,
}: Props) {
  if (!recherche) return null;
  return (
    <ul>
      {suggestions.map((jeu, index) => (
        <li key={jeu.id} className={index === indexActif ? "actif" : ""}>
          {jeu.title}
        </li>
      ))}
    </ul>
  );
}
