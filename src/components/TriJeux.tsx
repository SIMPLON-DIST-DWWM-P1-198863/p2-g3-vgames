import type { CritereTri } from "../services/triService";
import "../styles/triJeux.css";

interface TriJeuxProps {
  critere: CritereTri;
  onChangeTri: (critere: CritereTri) => void;
}

export default function TriJeux({ critere, onChangeTri }: TriJeuxProps) {
  return (
    <label className="tri-jeux">
      Trier par :
      <select
        className="tri-jeux__select"
        value={critere}
        onChange={(e) => onChangeTri(e.target.value as CritereTri)}
      >
        <option value="titre">Titre (A-Z)</option>
        <option value="annee">Année</option>
        <option value="prix">Prix</option>
      </select>
    </label>
  );
}