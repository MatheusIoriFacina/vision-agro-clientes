import logoVisionAgro from "../assets/vision-agro-logo.png";

export default function Header({ currentPage, onNavigate }) {
  const items = [
    { id: "home", label: "Início" },
    { id: "ajuda", label: "Central de ajuda" },
    { id: "atendimento", label: "Fale conosco" },
    { id: "avaliacao", label: "Avaliações" },
  ];

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="brand" onClick={() => onNavigate("home")} role="button" tabIndex={0}>
          <div className="brand__logo">
            <img src={logoVisionAgro} alt="Vision Agro" />
          </div>

          <div>
            <h1>VISION AGRO</h1>
            <span>PORTAL DO CLIENTE</span>
          </div>
        </div>

        <nav className="nav">
          {items.map((item) => (
            <button
              key={item.id}
              className={`nav__item ${currentPage === item.id ? "nav__item--active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="account-button">
          <span className="account-button__avatar">JS</span>
          <span className="account-button__text">
            <strong>João Silva</strong>
            <small>Produtor rural</small>
          </span>
        </button>
      </div>
    </header>
  );
}
