import type { Jeu } from "../types/jeu";

type Props = {
  recherche: string;
  jeux: Jeu[];
};
export default function ListSuggestions({ recherche, jeux }: Props) {
  const suggestions = jeux
    .filter((jeu) => jeu.title.toLowerCase().includes(recherche.toLowerCase()))
    .slice(0, 6);

  return (
    <ul>
      {suggestions.map((jeu) => (
        <li key={jeu.id}>{jeu.title}</li>
      ))}
    </ul>
  );
}
