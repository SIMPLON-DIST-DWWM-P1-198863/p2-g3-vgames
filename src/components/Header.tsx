import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
        <a className="header-brand" href="/">
        <img className="header-logo" src="/logo.png" alt="" />
        <div className="header-title">
            <span className="header-name">L’Arcadex</span>
            <p className="header-text">Ta prochaine partie commence ici.</p>
        </div>
</a>
      <a
        className="header-github"
        href="https://github.com/SIMPLON-DIST-DWWM-P1-198863/p2-g3-vgames"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="header-github-logo"
          src="/github-logo.png"
          alt="Voir le code sur GitHub"
        />
      </a>
    </header>
  );
}