import logoVisionAgro from "../assets/vision-agro-logo.png";

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer-art">
      <div className="footer-art__scene" aria-hidden="true">
        <svg viewBox="0 0 900 280" role="img">
          <defs>
            <linearGradient id="sky" x1="0" x2="1">
              <stop offset="0%" stopColor="#dff5e4" />
              <stop offset="100%" stopColor="#eef9ef" />
            </linearGradient>
            <linearGradient id="field" x1="0" x2="1">
              <stop offset="0%" stopColor="#1d6f3c" />
              <stop offset="100%" stopColor="#45a45f" />
            </linearGradient>
          </defs>
          <rect width="900" height="280" rx="28" fill="url(#sky)" />
          <circle cx="720" cy="70" r="38" fill="#f3c857" opacity=".9" />
          <path d="M0 185 C150 125, 310 215, 470 165 C620 118, 760 150, 900 128 L900 280 L0 280Z" fill="#7dbb72" />
          <path d="M0 215 C150 165, 315 240, 505 190 C650 152, 785 190, 900 160 L900 280 L0 280Z" fill="url(#field)" />
          <path d="M120 280 L275 172 M260 280 L365 188 M410 280 L490 190 M560 280 L625 178 M700 280 L760 163" stroke="#cde7b7" strokeWidth="5" opacity=".7" />
          <g fill="none" stroke="#145d34" strokeWidth="4" strokeLinecap="round">
            <path d="M210 120 L260 92 L315 118" />
            <path d="M260 92 L260 155" />
            <circle cx="210" cy="120" r="9" fill="#fff" />
            <circle cx="260" cy="92" r="9" fill="#fff" />
            <circle cx="315" cy="118" r="9" fill="#fff" />
          </g>
          <g transform="translate(610 135)">
            <rect x="0" y="26" width="90" height="35" rx="8" fill="#f5fbf6" stroke="#145d34" strokeWidth="4" />
            <circle cx="22" cy="69" r="13" fill="#173c28" />
            <circle cx="72" cy="69" r="13" fill="#173c28" />
            <path d="M16 27 L30 0 H58 L72 27" fill="#f5fbf6" stroke="#145d34" strokeWidth="4" />
          </g>
        </svg>
      </div>

      <div className="footer-art__content">
        <div className="footer-art__brand">
          <img src={logoVisionAgro} alt="Vision Agro" />
          <div>
            <span>TECNOLOGIA QUE IMPULSIONA O CAMPO</span>
            <h2>Mais conexão, suporte e confiança para quem produz.</h2>
          </div>
        </div>

        <div className="footer-art__actions">
          <button onClick={() => onNavigate("ajuda")}>Central de ajuda</button>
          <button onClick={() => onNavigate("atendimento")}>Fale conosco</button>
        </div>
      </div>

      <div className="footer-art__bottom">
        <span>Vision Agro • Módulo Clientes</span>
        <span>2026</span>
      </div>
    </footer>
  );
}
