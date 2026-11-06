import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img className="footer-logo" src="/logo.png" alt="" />
          <div>
            <p className="footer-name">L’Arcadex</p>
            <p className="footer-text">Ta prochaine partie commence ici.</p>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Navigation du pied de page">
          <a className="footer-link" href="/">
            Catalogue
          </a>
          <a className="footer-link" href="#">
            Retour en haut
          </a>
        </nav>
      </div>

      <p className="footer-text footer-copyright">
        © {new Date().getFullYear()} L’Arcadex
      </p>
    </footer>
  );
}
