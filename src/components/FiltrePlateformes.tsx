import "../styles/FiltrePlateformes.css";
type Props = {
  plateformes: string[];
  cochees: string[];
  onToggle: (plateforme: string) => void;
};

export default function FiltrePlateformes({
  plateformes,
  cochees,
  onToggle,
}: Props) {
  return (
    <fieldset className="platform-filter">
      <legend className="platform-filter__legend">Plateformes</legend>
      {plateformes.map((p) => (
        <label
          key={p}
          className={`platform-filter__item ${
            cochees.includes(p) ? "platform-filter__item--active" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={cochees.includes(p)}
            onChange={() => onToggle(p)}
          />
          <span>{p}</span>
        </label>
      ))}
    </fieldset>
  );
}
